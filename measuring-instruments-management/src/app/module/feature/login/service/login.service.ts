import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginForm} from "../model/LoginForm";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _API_URL = '';

  constructor(private _http: HttpClient) { }

  public login(loginForm: LoginForm): Observable<string> {
    return this._http.post<string>(this._API_URL, loginForm);
  }
}
