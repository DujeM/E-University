import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StudiesService } from 'src/app/core/services/studies.service';
import { Study } from 'src/app/shared/models/study.model';

@Component({
  selector: 'app-study-edit',
  templateUrl: './study-edit.component.html',
  styleUrls: ['./study-edit.component.scss']
})
export class StudyEditComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  study!: Study;

  editStudyForm!: FormGroup;
  name!: FormControl;
  code!: FormControl;

  constructor(
    private route: ActivatedRoute, 
    private studiesService: StudiesService,
    private router: Router, 
    private fb: FormBuilder) {
    if (route.snapshot.params['id']) {
      this.getStudyDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.name = new FormControl(this.study.name, [Validators.required]);
    this.code = new FormControl(this.study.code, [Validators.required]);

    this.editStudyForm = this.fb.group({
      name: this.name,
      code: this.code,
    });
  }

  getStudyDetails(id: string) {
    this.studiesService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.study = res;
        this.initForm();
      });
  }

  submit() {
    this.studiesService.edit({ ...this.editStudyForm.value, id: this.study.id })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Study) => {
        this.router.navigate(['..'])
      });
  }
}
