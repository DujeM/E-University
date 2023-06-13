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
import { StudiesComponent } from './studies/studies.component';
import { StudyNewComponent } from './studies/study-new/study-new.component';
import { StudyEditComponent } from './studies/study-edit/study-edit.component';
import { StudyDetailsComponent } from './studies/study-details/study-details.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ClassroomNewComponent } from './classrooms/classroom-new/classroom-new.component';
import { ClassroomEditComponent } from './classrooms/classroom-edit/classroom-edit.component';
import { ClassroomDetailsComponent } from './classrooms/classroom-details/classroom-details.component';
import { ClassroomListComponent } from './classrooms/classroom-list/classroom-list.component';
import { StudyListComponent } from './studies/study-list/study-list.component';
import { PeriodsComponent } from './periods/periods.component';
import { PeriodListComponent } from './periods/period-list/period-list.component';
import { PeriodNewComponent } from './periods/period-new/period-new.component';
import { PeriodEditComponent } from './periods/period-edit/period-edit.component';
import { PeriodDetailsComponent } from './periods/period-details/period-details.component';


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
    CourseDetailsComponent,
    StudiesComponent,
    StudyNewComponent,
    StudyEditComponent,
    StudyDetailsComponent,
    ClassroomsComponent,
    ClassroomNewComponent,
    ClassroomEditComponent,
    ClassroomDetailsComponent,
    ClassroomListComponent,
    StudyListComponent,
    PeriodsComponent,
    PeriodListComponent,
    PeriodNewComponent,
    PeriodEditComponent,
    PeriodDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuperAdminViewRoutingModule,
    SharedModule
  ]
})
export class SuperAdminViewModule { }
