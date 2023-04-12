import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services';
import { TokenResponse } from 'src/app/shared/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  login$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm() {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password
    });
  }

  submitForm() {
    this.authService.login(this.loginForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: TokenResponse) => {
        if (res?.access_token) {
          console.log("Success msg");
        }
      });
  }
}
