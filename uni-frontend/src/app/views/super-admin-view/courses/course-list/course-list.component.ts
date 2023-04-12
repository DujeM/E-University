import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  private ngUnsubscribe = new Subject();
  courses: Course[] = [];
  tableHeaders: string[] = [];
  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.courses = res;
      this.tableHeaders = ['Name', 'Code', 'Owner'];
    });
  }
}
