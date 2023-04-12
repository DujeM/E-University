import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  user!: User;
  deleteInProgress = false;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {
    if (route.snapshot.params['id']) {
      this.getUserDetails(route.snapshot.params['id']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getUserDetails(id: string) {
    this.usersService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.user = res;
      });
  }

  confirmDelete(event: boolean) {
    if (!event) {
      this.deleteInProgress = false;
      return;
    }

    this.usersService.delete(this.user.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.router.navigate(['..']);
      });
  }
}
