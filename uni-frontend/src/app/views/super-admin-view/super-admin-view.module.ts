import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminViewRoutingModule } from './super-admin-view-routing.module';
import { SuperAdminViewComponent } from './super-admin-view.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    SuperAdminViewComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SuperAdminViewRoutingModule
  ]
})
export class SuperAdminViewModule { }
