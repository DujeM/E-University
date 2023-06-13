import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Period } from 'src/app/shared/models/period.model';

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.scss']
})
export class PeriodEditComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  period!: Period;

  editPeriodForm!: FormGroup;
  order!: FormControl;
  start!: FormControl;
  end!: FormControl;

  constructor(
    private route: ActivatedRoute, 
    private periodsService: PeriodsService,
    private router: Router, 
    private fb: FormBuilder) {
    if (route.snapshot.params['id']) {
      this.getPeriodDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.order = new FormControl(this.period.order, [Validators.required]);
    this.start = new FormControl(this.period.start, [Validators.required]);
    this.end = new FormControl(this.period.end, [Validators.required]);

    this.editPeriodForm = this.fb.group({
      order: this.order,
      start: this.start,
      end: this.end
    });
  }

  getPeriodDetails(id: string) {
    this.periodsService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.period = res;
        this.initForm();
      });
  }

  submit() {
    this.periodsService.edit({ ...this.editPeriodForm.value, id: this.period.id })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Period) => {
        this.router.navigate(['..'])
      });
  }
}
