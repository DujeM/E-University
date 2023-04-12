import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faUsers = faUsers;
  faBook = faBook;
  constructor(public router: Router) {}
}
