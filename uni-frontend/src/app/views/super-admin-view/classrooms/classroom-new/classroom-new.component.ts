import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/shared/models/classroom.model';

@Component({
  selector: 'app-classroom-new',
  templateUrl: './classroom-new.component.html',
  styleUrls: ['./classroom-new.component.scss']
})
export class ClassroomNewComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  addClassroomForm!: FormGroup;
  code!: FormControl;

  constructor(
    private fb: FormBuilder, 
    private classroomsService: ClassroomsService, 
    private router: Router) {
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.code = new FormControl('', [Validators.required]);

    this.addClassroomForm = this.fb.group({
      code: this.code
    });
  }

  submit() {
    this.classroomsService.create(this.addClassroomForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Classroom) => {
        this.router.navigate(['..'])
      });
  }
}
