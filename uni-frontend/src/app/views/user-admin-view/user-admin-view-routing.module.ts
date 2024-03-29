import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAdminViewComponent } from './user-admin-view.component';
import { ScheduelComponent } from './scheduel/scheduel.component';
import { ScheduelListComponent } from './scheduel/scheduel-list/scheduel-list.component';
import { ScheduelNewComponent } from './scheduel/scheduel-new/scheduel-new.component';
import { ScheduelDetailsComponent } from './scheduel/scheduel-details/scheduel-details.component';
import { ScheduelEditComponent } from './scheduel/scheduel-edit/scheduel-edit.component';

const routes: Routes = [
  {        
    path: '',
    component: UserAdminViewComponent,
    children: [
      { 
        path: '',
        redirectTo: 'scheduel',
        pathMatch: 'full'
      },
      { 
        path: 'courses', 
        component: CoursesComponent,
        children: [
            { path: '', component: CourseListComponent },
            { path: 'new', component: CourseNewComponent },
            { path: ':id', component: CourseDetailsComponent },
            { path: ':id/edit', component: CourseEditComponent },
        ]
      },
      { 
        path: 'profile', 
        component: ProfileComponent,
        children: [
            { path: '', component: ProfileDetailsComponent },
            { path: 'edit', component: ProfileEditComponent },
        ]
      },
      { 
        path: 'scheduel', 
        component: ScheduelComponent,
        children: [
            { path: '', component: ScheduelListComponent },
            { path: 'new', component: ScheduelNewComponent },
            { path: ':id', component: ScheduelDetailsComponent },
            { path: ':id/edit', component: ScheduelEditComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminViewRoutingModule { }
