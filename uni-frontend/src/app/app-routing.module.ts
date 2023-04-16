import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectGuard } from './core/guards/redirect.guard';
import { superAdminGuard } from './core/guards/super-admin.guard';
import { userAdminGuard } from './core/guards/user-admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '', canActivate: [redirectGuard] },
  { 
    path: 'portal', 
    loadChildren: () => import('./views/user-admin-view/user-admin-view.module').then(m => m.UserAdminViewModule), 
    canActivate: [userAdminGuard] 
  },
  {
    path: 'super-admin-view',
    loadChildren: () => import('./views/super-admin-view/super-admin-view.module').then(m => m.SuperAdminViewModule),
    canActivate: [superAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
