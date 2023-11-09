import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {ManagementUnit} from "../model/entity/ManagementUnit";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagementUnitService {
  private _API_URL = 'http://localhost:8080/api/v1/management-units'

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public findAll(): Observable<ManagementUnit[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<ManagementUnit[]>(this._API_URL, {headers});
  }
}
