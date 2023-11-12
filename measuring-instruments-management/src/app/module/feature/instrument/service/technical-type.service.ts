import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {Observable} from "rxjs";
import {TechnicalType} from "../model/entity/TechnicalType";

@Injectable({
  providedIn: 'root'
})
export class TechnicalTypeService {
  private _API_URL = 'http://localhost:8080/api/v1/technical-types'

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  public findAll(): Observable<TechnicalType[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<TechnicalType[]>(this._API_URL, {headers});
  }
}
