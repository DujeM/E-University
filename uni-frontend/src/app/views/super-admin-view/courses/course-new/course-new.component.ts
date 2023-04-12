import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { CoursesService } from 'src/app/core/services/courses.service';
import { StudiesService } from 'src/app/core/services/studies.service';
import { Role } from 'src/app/shared/enums/role.enum';
import { Course } from 'src/app/shared/models/course.model';
import { Study } from 'src/app/shared/models/study.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.scss']
})
export class CourseNewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  addCourseForm!: FormGroup;
  name!: FormControl;
  code!: FormControl;
  owner!: FormControl;
  study!: FormControl;
  admins: User[] = [];
  studies: Study[] = [];

  constructor(
    private fb: FormBuilder, 
    private coursesService: CoursesService, 
    private router: Router,
    private usersService: UsersService,
    private studiesService: StudiesService) {
    this.initForm();
  }

  ngOnInit() {
    this.usersService.getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(users => {
        this.admins = users.filter(u => u.roles.includes(Role.ADMIN));
      })

    this.studiesService.getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(studies => {
        this.studies = studies;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.code = new FormControl('', [Validators.required]);
    this.owner = new FormControl(null, [Validators.required]);
    this.study = new FormControl(null, [Validators.required]);

    this.addCourseForm = this.fb.group({
      name: this.name,
      code: this.code,
      owner: this.owner,
      study: this.study
    });
  }

  submit() {
    this.coursesService.create(this.addCourseForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Course) => {
        this.router.navigate(['..'])
      });
  }
}
