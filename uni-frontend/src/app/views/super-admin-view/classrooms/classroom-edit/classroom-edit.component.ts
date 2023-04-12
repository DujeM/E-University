import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/shared/models/classroom.model';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.scss']
})
export class ClassroomEditComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  classroom!: Classroom;

  editClassroomForm!: FormGroup;
  code!: FormControl;

  constructor(
    private route: ActivatedRoute, 
    private classroomsService: ClassroomsService,
    private router: Router, 
    private fb: FormBuilder) {
    if (route.snapshot.params['id']) {
      this.getClassroomDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.code = new FormControl(this.classroom.code, [Validators.required]);

    this.editClassroomForm = this.fb.group({
      code: this.code,
    });
  }

  getClassroomDetails(id: string) {
    this.classroomsService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.classroom = res;
        this.initForm();
      });
  }

  submit() {
    this.classroomsService.edit({ ...this.editClassroomForm.value, id: this.classroom.id })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Classroom) => {
        this.router.navigate(['..'])
      });
  }
}
