import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService, UsersService } from 'src/app/core/services';
import { Role } from 'src/app/shared/enums/role.enum';
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

  constructor(private usersService: UsersService, public authService: AuthenticationService) {}

  ngOnInit() {
      this.usersService.get(this.authService.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.tableHeaders = ['Name', 'Code'];

        if (res.roles.includes(Role.ADMIN)) {
          this.courses = res.courses;
          return;
        }
        
        this.courses = res.enrolledCourses;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
