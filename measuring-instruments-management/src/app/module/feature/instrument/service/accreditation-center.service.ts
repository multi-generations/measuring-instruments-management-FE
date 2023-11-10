import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {Observable} from "rxjs";
import {AccreditationCenter} from "../model/entity/AccreditationCenter";

@Injectable({
  providedIn: 'root'
})
export class AccreditationCenterService {
  private _API_URL = 'http://localhost:8080/api/v1/accreditation-centers'

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public findAll(): Observable<AccreditationCenter[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<AccreditationCenter[]>(this._API_URL, {headers});
  }
}
