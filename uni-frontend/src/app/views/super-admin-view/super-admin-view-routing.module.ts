import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomDetailsComponent } from './classrooms/classroom-details/classroom-details.component';
import { ClassroomEditComponent } from './classrooms/classroom-edit/classroom-edit.component';
import { ClassroomListComponent } from './classrooms/classroom-list/classroom-list.component';
import { ClassroomNewComponent } from './classrooms/classroom-new/classroom-new.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';
import { CoursesComponent } from './courses/courses.component';
import { StudiesComponent } from './studies/studies.component';
import { StudyDetailsComponent } from './studies/study-details/study-details.component';
import { StudyEditComponent } from './studies/study-edit/study-edit.component';
import { StudyListComponent } from './studies/study-list/study-list.component';
import { StudyNewComponent } from './studies/study-new/study-new.component';
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
            },
            { 
                path: 'studies', 
                component: StudiesComponent,
                children: [
                    { path: '', component: StudyListComponent },
                    { path: 'new', component: StudyNewComponent },
                    { path: ':id', component: StudyDetailsComponent },
                    { path: ':id/edit', component: StudyEditComponent }
                ]
            },
            { 
                path: 'classrooms', 
                component: ClassroomsComponent,
                children: [
                    { path: '', component: ClassroomListComponent },
                    { path: 'new', component: ClassroomNewComponent },
                    { path: ':id', component: ClassroomDetailsComponent },
                    { path: ':id/edit', component: ClassroomEditComponent }
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
