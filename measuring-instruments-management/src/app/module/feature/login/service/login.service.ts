import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginForm} from "../model/LoginForm";
import {LoginDto} from "../model/LoginDto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _API_URL = 'http://localhost:8080/login';

  constructor(private _http: HttpClient) { }

  public login(loginForm: LoginForm): Observable<LoginDto> {
    return this._http.post<LoginDto>(this._API_URL, loginForm);
  }
}
