import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../login/service/auth.service";
import {MeasuringInstrumentSearchForm} from "../model/MeasuringInstrumentSearchForm";

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private _API_URL = 'http://localhost:8080/api/v1/measuring-instruments'

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  public findAll(currentPage: number, size: number, measuringInstrumentSearchForm?: MeasuringInstrumentSearchForm): Observable<any> {
    // const jwt = this._authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    let url = `${this._API_URL}?page=${currentPage}&size=${size}`
    if (measuringInstrumentSearchForm !== undefined) {
      url += `&multipleSearch=${measuringInstrumentSearchForm.multipleSearch}
      &instrumentGroupId=${measuringInstrumentSearchForm.instrumentGroupId}
      &instrumentTypeId=${measuringInstrumentSearchForm.instrumentTypeId}
      &instrumentStatusId=${measuringInstrumentSearchForm.instrumentStatusId}
      &startInServiceDate=${measuringInstrumentSearchForm.startInServiceDate}
      &endInServiceDate=${measuringInstrumentSearchForm.endInServiceDate}`
    }
    return this._http.get<any>(url);
  }

  public deleteByIds(deleteIds: number[]): Observable<void> {
    // const jwt = this._authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL, {body: deleteIds});
  }
}
