import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService, UsersService } from 'src/app/core/services';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject<void>();
  user!: User;

  constructor(private authService: AuthenticationService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.get(this.authService.id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      this.user = res;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
