import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {Observable} from "rxjs";
import {AttachedDocumentDetailDto} from "../model/dto/detail/AttachedDocumentDetailDto";
import {AttachedDocumentForm} from "../model/form/AttachedDocumentForm";

@Injectable({
  providedIn: 'root'
})
export class AttachedDocumentService {
  private _API_URL = 'http://localhost:8080/api/v1/attached-documents'

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public findDtoById(id: number): Observable<AttachedDocumentDetailDto> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<AttachedDocumentDetailDto>(`${this._API_URL}/${id}`, {headers});
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL +`/${id}`, {headers});
  }

  public create(attachedDocumentForm: AttachedDocumentForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, attachedDocumentForm, {headers});
  }

  public update(id: number, attachedDocumentForm: AttachedDocumentForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, attachedDocumentForm, {headers});
  }
}
