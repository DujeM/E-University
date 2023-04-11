import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { Role } from 'src/app/shared/enums/role.enum';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  private ngUnsubscribe = new Subject();
  user!: User;

  editUserForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  email!: FormControl;
  username!: FormControl;
  roles!: FormControl;
  rolesValues = Object.values(Role);

  constructor(
    private route: ActivatedRoute, 
    private usersService: UsersService, 
    private router: Router, 
    private fb: FormBuilder) {
    if (route.snapshot.params['id']) {
      this.getUserDetails(route.snapshot.params['id']);
    }
  }

  private initForm() {
    this.firstName = new FormControl(this.user.firstName, [Validators.required]);
    this.lastName = new FormControl(this.user.lastName, [Validators.required]);
    this.email = new FormControl(this.user.email, [Validators.email, Validators.required]);
    this.username = new FormControl(this.user.username, [Validators.required]);
    this.roles = new FormControl(this.user.roles[0], [Validators.required]);

    this.editUserForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      roles: this.roles
    });
  }

  getUserDetails(id: string) {
    this.usersService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.user = res;
        this.initForm();
      });
  }

  submit() {
    this.roles.setValue([this.roles.value]);

    this.usersService.edit({ ...this.editUserForm.value, id: this.user.id })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: User) => {
        this.router.navigate(['..'])
      });
  }
}
