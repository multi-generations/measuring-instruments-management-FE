import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../login/service/auth.service";
import {MeasuringInstrumentSearchForm} from "../model/form/MeasuringInstrumentSearchForm";
import {MeasuringInstrumentDetailDto} from "../model/dto/detail/MeasuringInstrumentDetailDto";
import {TechnicalCharacteristicDetailDto} from "../model/dto/detail/TechnicalCharacteristicDetailDto";
import {AttachedDocumentDetailDto} from "../model/dto/detail/AttachedDocumentDetailDto";
import {InstrumentAccreditationDetailDto} from "../model/dto/detail/InstrumentAccreditationDetailDto";
import {InstrumentRepairDetailDto} from "../model/dto/detail/InstrumentRepairDetailDto";
import {InstrumentUsageDetailDto} from "../model/dto/detail/InstrumentUsageDetailDto";
import {MeasuringInstrumentForm} from "../model/form/MeasuringInstrumentForm";
import {InstrumentForwardDetailDto} from "../model/dto/detail/InstrumentForwardDetailDto";
import {DocumentVolatilityDetailDto} from "../model/dto/detail/DocumentVolatilityDetailDto";

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private _API_URL = 'http://localhost:8080/api/v1/measuring-instruments'

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public findAllDto(currentPage: number, size: number, measuringInstrumentSearchForm?: MeasuringInstrumentSearchForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);

    let url = `${this._API_URL}?page=${currentPage}&size=${size}`

    if (measuringInstrumentSearchForm !== undefined) {
      url += `&multipleSearch=${measuringInstrumentSearchForm.multipleSearch}`
        + `&instrumentGroupId=${measuringInstrumentSearchForm.instrumentGroupId}`
        + `&instrumentStatusId=${measuringInstrumentSearchForm.instrumentStatusId}`
        + `&startInServiceDate=${measuringInstrumentSearchForm.startInServiceDate}`
        + `&endInServiceDate=${measuringInstrumentSearchForm.endInServiceDate}`;
    }

    return this._http.get<any>(url, {headers});
  }

  public findDtoById(id: number): Observable<MeasuringInstrumentDetailDto> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<MeasuringInstrumentDetailDto>(`${this._API_URL}/${id}`, {headers});
  }

  public deleteByIds(deleteIds: number[]): Observable<void> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.delete<void>(this._API_URL, {headers, body: deleteIds});
  }

  public findAllImageLinks(id: number): Observable<string[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<string[]>(`${this._API_URL}/${id}/images`, {headers});
  }

  public findAllTechnicalCharacteristics(id: number): Observable<TechnicalCharacteristicDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<TechnicalCharacteristicDetailDto[]>(`${this._API_URL}/${id}/technical-characteristics`, {headers});
  }

  public findAllAttachedDocuments(id: number): Observable<AttachedDocumentDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<AttachedDocumentDetailDto[]>(`${this._API_URL}/${id}/attached-documents`, {headers});
  }

  public findAllDocumentVolatility(id: number): Observable<DocumentVolatilityDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<DocumentVolatilityDetailDto[]>(`${this._API_URL}/${id}/document-volatiles`, {headers});
  }

  public findAllForwards(id: number): Observable<InstrumentForwardDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentForwardDetailDto[]>(`${this._API_URL}/${id}/instrument-forwards`, {headers});
  }

  public findAllAccreditations(id: number): Observable<InstrumentAccreditationDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentAccreditationDetailDto[]>(`${this._API_URL}/${id}/accreditations`, {headers});
  }

  public findAllRepairs(id: number): Observable<InstrumentRepairDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentRepairDetailDto[]>(`${this._API_URL}/${id}/repairs`, {headers});
  }

  public findAllUsages(id: number): Observable<InstrumentUsageDetailDto[]> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.get<InstrumentUsageDetailDto[]>(`${this._API_URL}/${id}/usages`, {headers});
  }

  public create(measuringInstrumentForm: MeasuringInstrumentForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.post(this._API_URL, measuringInstrumentForm, {headers});
  }

  public update(id: number, measuringInstrumentForm: MeasuringInstrumentForm): Observable<any> {
    const jwt = this._authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this._http.put(this._API_URL + `/${id}`, measuringInstrumentForm, {headers});
  }
}
