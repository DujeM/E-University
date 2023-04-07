import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from 'src/app/shared/enums/role.enum';
import { AuthenticationService } from '../services';

export const redirectGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        router.navigateByUrl('login');
        return false;
    }

    authService.getCurrentRoles();

    if (authService.roles.includes(Role.SUPER_ADMIN)) {
        router.navigateByUrl('super-admin-view');
    } else if (authService.roles.includes(Role.ADMIN)) {
        router.navigateByUrl('admin-view');
    } else {
        router.navigateByUrl('user-view');
    }
    
    return true;
}
