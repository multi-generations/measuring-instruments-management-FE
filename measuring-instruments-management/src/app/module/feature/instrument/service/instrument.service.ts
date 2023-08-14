import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MeasuringInstrumentListDto} from "../model/MeasuringInstrumentListDto";

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private _API_URL = 'http://localhost:8080/api/v1/instruments'

  constructor(private _http: HttpClient) { }

  public findAll(): Observable<MeasuringInstrumentListDto[]> {
    return this._http.get<MeasuringInstrumentListDto[]>(this._API_URL);
  }
}
