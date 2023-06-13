import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Period } from 'src/app/shared/models/period.model';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  periods: Period[] = [];
  tableHeaders: string[] = [];
  constructor(private periodsService: PeriodsService) {}

  ngOnInit() {
    this.periodsService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.periods = res;
      this.tableHeaders = ['Order', 'Start', 'End'];
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
