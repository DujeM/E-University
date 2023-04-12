import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  course!: Course;
  deleteInProgress = false;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private router: Router) {
    if (route.snapshot.params['id']) {
      this.getUserDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUserDetails(id: string) {
    this.coursesService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.course = res;
      });
  }

  confirmDelete(event: boolean) {
    if (!event) {
      this.deleteInProgress = false;
      return;
    }

    this.coursesService.delete(this.course.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.router.navigate(['..']);
      });
  }
}
