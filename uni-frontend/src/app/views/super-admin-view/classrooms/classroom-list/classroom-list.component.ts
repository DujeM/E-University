import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/shared/models/classroom.model';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent {
  private ngUnsubscribe = new Subject<void>();
  classrooms: Classroom[] = [];
  tableHeaders: string[] = [];
  constructor(private classroomsService: ClassroomsService) {}

  ngOnInit() {
    this.classroomsService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.classrooms = res;
      this.tableHeaders = ['Code'];
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
