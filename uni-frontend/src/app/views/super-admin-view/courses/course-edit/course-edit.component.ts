import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Role } from 'src/app/shared/enums/role.enum';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  course!: Course;

  editCourseForm!: FormGroup;
  name!: FormControl;
  code!: FormControl;
  owner!: FormControl;
  admins: User[] = [];

  constructor(
    private route: ActivatedRoute, 
    private coursesService: CoursesService,
    private usersService: UsersService, 
    private router: Router, 
    private fb: FormBuilder) {
    if (route.snapshot.params['id']) {
      this.getCourseDetails(route.snapshot.params['id']);
    }
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
    this.name = new FormControl(this.course.name, [Validators.required]);
    this.code = new FormControl(this.course.code, [Validators.required]);
    this.owner = new FormControl(this.course.owner.id, [Validators.required]);

    this.editCourseForm = this.fb.group({
      name: this.name,
      code: this.code,
      owner: this.owner
    });
  }

  getCourseDetails(id: string) {
    this.coursesService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.course = res;
        this.initForm();
      });
  }

  submit() {
    this.coursesService.edit({ ...this.editCourseForm.value, id: this.course.id })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Course) => {
        this.router.navigate(['..'])
      });
  }
}
