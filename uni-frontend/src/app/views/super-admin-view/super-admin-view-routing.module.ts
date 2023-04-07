import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminViewComponent } from './super-admin-view.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        component: SuperAdminViewComponent,
        children: [
            { path: 'users', component: UsersComponent } 
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminViewRoutingModule { }
