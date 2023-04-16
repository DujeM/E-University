import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from 'src/app/shared/enums/role.enum';
import { AuthenticationService } from '../services';

export const userAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        router.navigateByUrl('login');
        return false;
    }

    if (!authService.roles.includes(Role.ADMIN) && !authService.roles.includes(Role.USER)) {
        router.navigateByUrl('');
        return false;
    }
    
    return true;
}
