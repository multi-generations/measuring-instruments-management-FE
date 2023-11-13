import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../login/service/auth.service';
import { Observable } from 'rxjs';
import { InstrumentAccreditationForm } from '../model/form/InstrumentAccreditationForm';

@Injectable({
  providedIn: 'root',
})
export class InstrumentAccreditationService {
  private _API_URL = 'http://localhost:8080/api/v1/instrument-accreditations';

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  public findDtoById(id: number): Observable<InstrumentAccreditationForm> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    console.log(id);
    return this._http.get<InstrumentAccreditationForm>(
      `${this._API_URL}/${id}`,
      {
        headers,
      }
    );
  }

  public deleteById(id: number): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL + `/${id}`, {headers});
  }

  public create(
    instrumentAccreditationForm: InstrumentAccreditationForm
  ): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, instrumentAccreditationForm, {
      headers,
    });
  }

  public update(
    id: number,
    instrumentAccreditation: InstrumentAccreditationForm
  ): Observable<any> {
    console.log(id, instrumentAccreditation);
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, instrumentAccreditation, {
      headers,
    });
  }
}
