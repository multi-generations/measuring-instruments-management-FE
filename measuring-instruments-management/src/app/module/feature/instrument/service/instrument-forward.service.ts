import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../login/service/auth.service";
import {Observable} from "rxjs";
import {InstrumentForwardDetailDto} from "../model/dto/detail/InstrumentForwardDetailDto";
import {InstrumentForwardForm} from "../model/form/InstrumentForwardForm";

@Injectable({
  providedIn: 'root'
})
export class InstrumentForwardService {
  private _API_URL = 'http://localhost:8080/api/v1/instrument-forwards';

  constructor(private _http: HttpClient, private _authService: AuthService) {
  }

  public findDtoById(id: number): Observable<InstrumentForwardDetailDto> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentForwardDetailDto>(`${this._API_URL}/${id}`, {headers});
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL + `/${id}`, {headers});
  }

  public create(instrumentForwardForm: InstrumentForwardForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, instrumentForwardForm, {headers});
  }

  public update(id: number, instrumentForwardForm: InstrumentForwardForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, instrumentForwardForm, {headers});
  }
}
