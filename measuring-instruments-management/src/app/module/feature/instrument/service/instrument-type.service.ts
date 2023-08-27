import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class InstrumentTypeService {
  private _API_URL = 'http://localhost:8080/api/v1/instrument-types'

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  public findAll() {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<any>(this._API_URL, {headers});
  }
}
