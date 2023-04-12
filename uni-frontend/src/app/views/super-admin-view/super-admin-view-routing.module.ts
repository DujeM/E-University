import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';
import { CoursesComponent } from './courses/courses.component';
import { SuperAdminViewComponent } from './super-admin-view.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        component: SuperAdminViewComponent,
        children: [
            { 
                path: 'users', 
                component: UsersComponent,
                children: [
                    { path: '', component: UserListComponent },
                    { path: 'new', component: UserNewComponent },
                    { path: ':id', component: UserDetailsComponent },
                    { path: ':id/edit', component: UserEditComponent }
                ]
            },
            { 
                path: 'courses', 
                component: CoursesComponent,
                children: [
                    { path: '', component: CourseListComponent },
                    { path: 'new', component: CourseNewComponent },
                    { path: ':id', component: CourseDetailsComponent },
                    { path: ':id/edit', component: CourseEditComponent }
                ]
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminViewRoutingModule { }
