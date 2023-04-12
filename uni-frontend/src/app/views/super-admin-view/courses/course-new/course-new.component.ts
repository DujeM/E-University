import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Role } from 'src/app/shared/enums/role.enum';
import { Course } from 'src/app/shared/models/course.model';
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
  admins: User[] = [];

  constructor(
    private fb: FormBuilder, 
    private coursesService: CoursesService, 
    private router: Router,
    private usersService: UsersService) {
    this.initForm();
  }

  ngOnInit() {
    this.usersService.getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(users => {
        this.admins = users.filter(u => u.roles.includes(Role.ADMIN));
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

    this.addCourseForm = this.fb.group({
      name: this.name,
      code: this.code,
      owner: this.owner
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
