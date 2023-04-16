import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseNewComponent } from './courses/course-new/course-new.component';
import { CoursesComponent } from './courses/courses.component';
import { UserAdminViewComponent } from './user-admin-view.component';

const routes: Routes = [
  {        
    path: '',
    component: UserAdminViewComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminViewRoutingModule { }
