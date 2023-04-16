import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService, UsersService } from 'src/app/core/services';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.scss']
})
export class CourseNewComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    courses: Course[] = [];
    tableHeaders: string[] = [];
    enrolledCourses: Course[] = [];

    constructor(private coursesService: CoursesService, private usersService: UsersService, private authService: AuthenticationService) {}

    ngOnInit(): void {
        this.coursesService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
            this.courses = res;
            this.tableHeaders = ['Name', 'Code'];
        });

        this.usersService.getAllEntrolledCourses(this.authService.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
            this.enrolledCourses = res;
        });
    }

    ngOnDestroy(): void {
        
    }

    checkIfAlreadyEnrolled(courseId: string) {
        return this.enrolledCourses.find(c => c.id === courseId);
    }

    courseEnroll(courseId: string) {
        this.usersService.courseEnroll({ userId: this.authService.id, courseId: courseId }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
            this.ngOnInit();
        });
    }

    removeEnrolledCourse(courseId: string) {
        this.usersService.removeEnrolledCourse({ userId: this.authService.id, courseId: courseId }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
            this.ngOnInit();
        });
    }
}
