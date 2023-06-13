import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faCalendarDays, faChalkboard, faClock, faGraduationCap, faRightFromBracket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSuperAdmin = false;
  faUsers = faUsers;
  faUser = faUser;
  faBook = faBook;
  faCalendar = faCalendarDays;
  faChalkboard = faChalkboard;
  faGraduationCap = faGraduationCap;
  faLogout = faRightFromBracket;
  faClock = faClock;
  
  constructor(public router: Router, public authService: AuthenticationService) {
    this.isSuperAdmin = authService.isSuperAdmin();
  }
}
