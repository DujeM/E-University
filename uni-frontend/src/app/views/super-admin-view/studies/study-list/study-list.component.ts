import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StudiesService } from 'src/app/core/services/studies.service';
import { Study } from 'src/app/shared/models/study.model';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss']
})
export class StudyListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  studies: Study[] = [];
  tableHeaders: string[] = [];
  constructor(private studiesService: StudiesService) {}

  ngOnInit() {
    this.studiesService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.studies = res;
      this.tableHeaders = ['Name', 'Code'];
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
