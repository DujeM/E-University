import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs';
import { Role } from 'src/app/shared/enums/role.enum';
import { TokenResponse } from 'src/app/shared/models/auth.model';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  id: string = '';
  roles: Role[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(data: {username: string, password: string}) {
    return this.httpClient.post<TokenResponse>('http://localhost:3000/auth/login', data).pipe(
      tap((tokens: TokenResponse) => {
        if (tokens?.access_token) {
          this.storeTokens(tokens.access_token);
          this.decodeToken(tokens.access_token);
        }
      }),
      map(token => token)      
    );
  }

  logout() {
    this.roles = [];
    this.removeTokens();
    this.router.navigateByUrl('');
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  isLoggedIn() {
    return !!this.getAuthorizationToken();
  }

  getCurrentRoles() {
    this.decodeToken(this.getAuthorizationToken());
  }

  isSuperAdmin() {
    this.getCurrentRoles();
    return this.roles.includes(Role.SUPER_ADMIN);
  }

  private storeTokens(accessToken: string) {
    localStorage.setItem(TOKEN, accessToken);
  }

  private decodeToken(token: string | null) {
    if (!token) {
      return this.router.navigateByUrl('');
    }
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    console.log(decodedToken)

    this.roles = decodedToken.roles;
    this.id = decodedToken.id;
    return this.router.navigateByUrl('');
  }

  private removeTokens() {
    localStorage.clear();
  }
}
