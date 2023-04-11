import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of, tap, throwError } from "rxjs";
import { AuthenticationService } from "../services";

export const authorizationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router)
    const token = authService.getAuthorizationToken();

    if (token && !req.url.includes('login')) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    return next(req).pipe(
        catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                authService.logout();
            }
            return of(err);
        })
    );
}
