import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
            { path: '', pathMatch: 'prefix', redirectTo: 'users' } ,
            { 
                path: 'users', 
                component: UsersComponent,
                children: [
                    { path: '', component: UserListComponent },
                    { path: 'new', component: UserNewComponent },
                    { path: ':id', component: UserDetailsComponent },
                    { path: ':id/edit', component: UserEditComponent }
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
