import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  users: User[] = [];
  tableHeaders: string[] = [];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.users = res;
      this.tableHeaders = ['Username', 'Email', 'First name', 'Last name', 'Role'];
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
