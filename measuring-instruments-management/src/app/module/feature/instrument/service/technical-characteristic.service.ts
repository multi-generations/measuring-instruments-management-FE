import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {TechnicalCharacteristicForm} from "../model/form/TechnicalCharacteristicForm";

@Injectable({
  providedIn: 'root'
})
export class TechnicalCharacteristicService {
  private _API_URL = 'http://localhost:8080/api/v1/technical-characteristics'

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public findDtoById(id: number): Observable<TechnicalCharacteristicForm> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<TechnicalCharacteristicForm>(`${this._API_URL}/${id}`, {headers});
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL + `/${id}}`, {headers});
  }

  public create(technicalCharacteristicForm: TechnicalCharacteristicForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, technicalCharacteristicForm, {headers});
  }

  public update(id: number, technicalCharacteristicForm: TechnicalCharacteristicForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, technicalCharacteristicForm, {headers});
  }
}
