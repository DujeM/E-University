import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminViewRoutingModule } from './super-admin-view-routing.module';
import { SuperAdminViewComponent } from './super-admin-view.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserNewComponent } from './users/user-new/user-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';


@NgModule({
  declarations: [
    SuperAdminViewComponent,
    UsersComponent,
    UserNewComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    CoursesComponent,
    CourseListComponent,
    CourseNewComponent,
    CourseEditComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuperAdminViewRoutingModule,
    SharedModule
  ]
})
export class SuperAdminViewModule { }
