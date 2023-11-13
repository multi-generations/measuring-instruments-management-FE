import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {Observable} from "rxjs";
import {TechnicalCharacteristicForm} from "../model/form/TechnicalCharacteristicForm";
import {DocumentVolatilityDetailDto} from "../model/dto/detail/DocumentVolatilityDetailDto";
import {DocumentVolatilityForm} from "../model/form/DocumentVolatilityForm";

@Injectable({
  providedIn: 'root'
})
export class DocumentVolatilityService {
  private _API_URL = 'http://localhost:8080/api/v1/document-volatiles'

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public findDtoById(id: number): Observable<DocumentVolatilityDetailDto> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<DocumentVolatilityDetailDto>(`${this._API_URL}/${id}`, {headers});
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL + `/${id}}`, {headers});
  }

  public create(documentVolatilityForm: DocumentVolatilityForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, documentVolatilityForm, {headers});
  }

  public update(id: number, documentVolatilityForm: DocumentVolatilityForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, documentVolatilityForm, {headers});
  }
}
