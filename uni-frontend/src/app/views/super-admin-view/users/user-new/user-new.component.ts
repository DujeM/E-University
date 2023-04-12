import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { Role } from 'src/app/shared/enums/role.enum';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  addUserForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  email!: FormControl;
  username!: FormControl;
  password!: FormControl;
  roles!: FormControl;
  rolesValues = Object.values(Role);

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl(Math.random().toString(36).substr(2, 8), [Validators.required]);
    this.roles = new FormControl([], [Validators.required]);
    this.password.disable();

    this.addUserForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
      roles: this.roles
    });
  }

  submit() {
    this.roles.setValue([this.roles.value]);
    this.password.enable();
    this.usersService.create(this.addUserForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: User) => {
        this.router.navigate(['..'])
      });
  }
}
