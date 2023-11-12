import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../login/service/auth.service';
import { Observable } from 'rxjs';
import { InstrumentUsageForm } from '../model/form/InstrumentUsageForm';

@Injectable({
  providedIn: 'root',
})
export class InstrumentUsageService {
  private _API_URL = 'http://localhost:8080/api/v1/instrument-usages';

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  public findDtoById(id: number): Observable<InstrumentUsageForm> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentUsageForm>(`${this._API_URL}/${id}`, {
      headers,
    });
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL + `/${id}`, {headers});
  }

  public create(instrumentUsageForm: InstrumentUsageForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, instrumentUsageForm, {
      headers,
    });
  }

  public update(
    id: number,
    instrumentUsage: InstrumentUsageForm
  ): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, instrumentUsage, {
      headers,
    });
  }
}
