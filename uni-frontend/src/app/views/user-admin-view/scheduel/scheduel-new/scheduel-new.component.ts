import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-scheduel-new',
  templateUrl: './scheduel-new.component.html',
  styleUrls: ['./scheduel-new.component.scss']
})
export class ScheduelNewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  addEventForm!: FormGroup;
  title!: FormControl;
  details!: FormControl;
  recurring!: FormControl;
  startDate!: FormControl;
  period!: FormControl;
  classroom!: FormControl;
  course!: FormControl;

  periods: Period[] = [];
  classrooms: Classroom[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder, 
    private eventsService: EventsService, 
    private periodsService: PeriodsService,
    private classroomsService: ClassroomsService,
    private coursesService: CoursesService,
    private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
    this.periodsService.getAll()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(periods => {
      this.periods = periods;
    });

    this.classroomsService.getAll()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(classrooms => {
      this.classrooms = classrooms;
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
    this.title = new FormControl('', [Validators.required]);
    this.details = new FormControl('', [Validators.required]);
    this.recurring = new FormControl(false, [Validators.required]);
    this.startDate = new FormControl('', [Validators.required]);
    this.period = new FormControl(null, [Validators.required]);
    this.classroom = new FormControl(null, [Validators.required]);
    this.course = new FormControl(null, [Validators.required]);

    this.addEventForm = this.fb.group({
      title: this.title,
      details: this.details,
      recurring: this.recurring,
      startDate: this.startDate,
      period: this.period,
      classroom: this.classroom,
      course: this.course
    });
  }

  submit() {
    this.eventsService.create(this.addEventForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Event) => {
        this.router.navigate(['..'])
      });
  }
}
