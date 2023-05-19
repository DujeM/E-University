import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAdminViewRoutingModule } from './user-admin-view-routing.module';
import { UserAdminViewComponent } from './user-admin-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';


@NgModule({
  declarations: [
    UserAdminViewComponent,
    CoursesComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    CourseNewComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    UserAdminViewRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserAdminViewModule { }
