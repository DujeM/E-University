import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService, UsersService } from 'src/app/core/services';
import { Role } from 'src/app/shared/enums/role.enum';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  user!: User;

  editUserForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  email!: FormControl;
  username!: FormControl;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService, 
    private usersService: UsersService, 
    private router: Router) {}

  ngOnInit(): void {
    this.usersService.get(this.authService.id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      this.user = res;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.firstName = new FormControl(this.user.firstName, [Validators.required]);
    this.lastName = new FormControl(this.user.lastName, [Validators.required]);
    this.email = new FormControl(this.user.email, [Validators.email, Validators.required]);
    this.username = new FormControl(this.user.username, [Validators.required]);

    this.editUserForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
    });
  }

  submit() {
    this.usersService.edit({ ...this.editUserForm.value, id: this.user.id })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: User) => {
        this.router.navigate(['..'])
      });
  }
}
