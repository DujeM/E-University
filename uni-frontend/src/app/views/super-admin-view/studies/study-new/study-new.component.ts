import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StudiesService } from 'src/app/core/services/studies.service';
import { Study } from 'src/app/shared/models/study.model';

@Component({
  selector: 'app-study-new',
  templateUrl: './study-new.component.html',
  styleUrls: ['./study-new.component.scss']
})
export class StudyNewComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  addStudyForm!: FormGroup;
  name!: FormControl;
  code!: FormControl;

  constructor(
    private fb: FormBuilder, 
    private studiesService: StudiesService, 
    private router: Router) {
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.code = new FormControl('', [Validators.required]);

    this.addStudyForm = this.fb.group({
      name: this.name,
      code: this.code
    });
  }

  submit() {
    this.studiesService.create(this.addStudyForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Study) => {
        this.router.navigate(['..'])
      });
  }
}
