import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Period } from 'src/app/shared/models/period.model';

@Component({
  selector: 'app-period-details',
  templateUrl: './period-details.component.html',
  styleUrls: ['./period-details.component.scss']
})
export class PeriodDetailsComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  period!: Period;
  deleteInProgress = false;

  constructor(private route: ActivatedRoute, private periodsService: PeriodsService, private router: Router) {
    if (route.snapshot.params['id']) {
      this.getPeriodDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getPeriodDetails(id: string) {
    this.periodsService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.period = res;
      });
  }

  confirmDelete(event: boolean) {
    if (!event) {
      this.deleteInProgress = false;
      return;
    }

    this.periodsService.delete(this.period.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.router.navigate(['..']);
      });
  }
}
