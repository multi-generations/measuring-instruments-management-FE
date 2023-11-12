import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../login/service/auth.service';
import { Observable } from 'rxjs';
import { InstrumentRepairForm } from '../model/form/InstrumentRepairForm';

@Injectable({
  providedIn: 'root',
})
export class InstrumentRepairService {
  private _API_URL = 'http://localhost:8080/api/v1/instrument-repairs';

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  public findDtoById(id: number): Observable<InstrumentRepairForm> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentRepairForm>(`${this._API_URL}/${id}`, {
      headers,
    });
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL + `/${id}`, {headers});
  }

  public create(instrumentRepairForm: InstrumentRepairForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, instrumentRepairForm, {
      headers,
    });
  }

  public update(
    id: number,
    instrumentRepair: InstrumentRepairForm
  ): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, instrumentRepair, {
      headers,
    });
  }
}
