import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PeriodsService } from 'src/app/core/services/periods.service';
import { Period } from 'src/app/shared/models/period.model';

@Component({
  selector: 'app-period-new',
  templateUrl: './period-new.component.html',
  styleUrls: ['./period-new.component.scss']
})
export class PeriodNewComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  addPeriodForm!: FormGroup;
  order!: FormControl;
  start!: FormControl;
  end!: FormControl;

  constructor(
    private fb: FormBuilder, 
    private periodsService: PeriodsService, 
    private router: Router) {
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.order = new FormControl('', [Validators.required]);
    this.start = new FormControl('', [Validators.required]);
    this.end = new FormControl('', [Validators.required]);

    this.addPeriodForm = this.fb.group({
      order: this.order,
      start: this.start,
      end: this.end
    });
  }

  submit() {
    this.periodsService.create(this.addPeriodForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Period) => {
        this.router.navigate(['..'])
      });
  }
}
