import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public setToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public getAuthorizationHeader(jwt: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${jwt}`)
  }

  public deleteToken(): void {
    localStorage.removeItem('jwt');
  }

  public deleteRoles(): void {
    localStorage.removeItem('roles');
  }

  public setAuthInfo(username: string, roles: string[]): void {
    localStorage.setItem('username', username);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  public getRoles(): string[] | null {
    const roles = localStorage.getItem('roles');

    if (roles !== null) {
      return JSON.parse(roles);
    }

    return null;
  }
}
