import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService, UsersService } from 'src/app/core/services';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  private ngUnsubscribe = new Subject<void>();
  courses: Course[] = [];
  tableHeaders: string[] = [];

  constructor(private usersService: UsersService, private authService: AuthenticationService) {}

  ngOnInit() {
      this.usersService.getAllEntrolledCourses(this.authService.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          this.courses = res;
          this.tableHeaders = ['Name', 'Code'];
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
