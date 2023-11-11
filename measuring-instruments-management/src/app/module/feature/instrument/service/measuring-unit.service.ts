import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {MeasuringUnit} from "../model/entity/MeasuringUnit";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeasuringUnitService {
  private _API_URL = 'http://localhost:8080/api/v1/measuring-units'

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  public findAll(): Observable<MeasuringUnit[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<MeasuringUnit[]>(this._API_URL, {headers});
  }

  public findByTechnicalType(technicalTypeId: number): Observable<MeasuringUnit[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<MeasuringUnit[]>(this._API_URL + `/technical-type/${technicalTypeId}`, {headers});
  }
}
