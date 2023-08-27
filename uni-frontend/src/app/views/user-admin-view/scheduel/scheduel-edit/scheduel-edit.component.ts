import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDay, compareAsc } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { EventsService } from 'src/app/core/services/events.service';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Classroom } from 'src/app/shared/models/classroom.model';
import { Course } from 'src/app/shared/models/course.model';
import { Event } from 'src/app/shared/models/event.model';
import { Period } from 'src/app/shared/models/period.model';

@Component({
  selector: 'app-scheduel-edit',
  templateUrl: './scheduel-edit.component.html',
  styleUrls: ['./scheduel-edit.component.scss']
})
export class ScheduelEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  event!: Event;
  editEventForm!: FormGroup;
  title!: FormControl;
  details!: FormControl;
  recurring!: FormControl;
  startDate!: FormControl;
  period!: FormControl;
  classroom!: FormControl;
  course!: FormControl;

  allPeriods: Period[] = [];
  periods: Period[] = [];
  allClassrooms: Classroom[] = [];
  classrooms: Classroom[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder, 
    private eventsService: EventsService, 
    private periodsService: PeriodsService,
    private classroomsService: ClassroomsService,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute) {
      if (route.snapshot.params['id']) {
        this.getEventDetails(route.snapshot.params['id']);
      }
  }

  ngOnInit(): void {
    this.periodsService.getAll()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(periods => {
      this.periods = periods;
      this.allPeriods = periods;
    });

    this.classroomsService.getAll()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(classrooms => {
      this.classrooms = classrooms;
      this.allClassrooms = classrooms;
    });

    this.coursesService.getAll()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(courses => {
      this.courses = courses;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.title = new FormControl(this.event.title, [Validators.required]);
    this.details = new FormControl(this.event.details, [Validators.required]);
    this.recurring = new FormControl(this.event.recurring, [Validators.required]);
    this.startDate = new FormControl(this.event.startDate, [Validators.required]);
    this.period = new FormControl(this.event.period.id, [Validators.required]);
    this.classroom = new FormControl(this.event.classroom.id, [Validators.required]);
    this.course = new FormControl(this.event.course.id, [Validators.required]);

    this.editEventForm = this.fb.group({
      title: this.title,
      details: this.details,
      recurring: this.recurring,
      startDate: this.startDate,
      period: this.period,
      classroom: this.classroom,
      course: this.course
    });
  }

  getEventDetails(id: string) {
    this.eventsService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Event) => {
        this.event = res;
        this.initForm();
        this.getEventsByDay();
      });
  }

  submit() {
    this.eventsService.edit({...this.editEventForm.value, day: getDay(new Date(this.startDate.value)), id: this.event.id})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Event) => {
        this.router.navigate(['..'])
      });
  }

  getEventsByDay() {
    this.eventsService.getAllByDay(getDay(new Date(this.startDate.value)))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Event[]) => {
        this.periods = this.allPeriods;
        this.classrooms = this.allClassrooms;

        res.forEach((e: Event) => {
          if (e.id === this.event.id) {
            return;
          }

          if (e.recurring || compareAsc(new Date(e.startDate), new Date(this.startDate.value)) === 0) {
            this.periods = this.periods.filter(p => p.id !== e.period.id);
            this.classrooms = this.classrooms.filter(c => c.id !== e.classroom.id);
          }
        });
      });
  }
}
