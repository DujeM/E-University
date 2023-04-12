import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/shared/models/classroom.model';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.scss']
})
export class ClassroomDetailsComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  classroom!: Classroom;
  deleteInProgress = false;

  constructor(private route: ActivatedRoute, private classroomsService: ClassroomsService, private router: Router) {
    if (route.snapshot.params['id']) {
      this.getClassroomDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getClassroomDetails(id: string) {
    this.classroomsService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.classroom = res;
      });
  }

  confirmDelete(event: boolean) {
    if (!event) {
      this.deleteInProgress = false;
      return;
    }

    this.classroomsService.delete(this.classroom.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.router.navigate(['..']);
      });
  }
}
