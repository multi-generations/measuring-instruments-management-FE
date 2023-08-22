import {Component} from '@angular/core';
import {MeasuringInstrumentDetailDto} from "../../model/dto/MeasuringInstrumentDetailDto";
import {Observable, Observer} from "rxjs";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {InstrumentService} from "../../service/instrument.service";
import {ActivatedRoute} from "@angular/router";
import {TechnicalCharacteristicDetailDto} from "../../model/dto/TechnicalCharacteristicDetailDto";
import {AttachedDocumentDetailDto} from "../../model/dto/AttachedDocumentDetailDto";
import {InstrumentAccreditationDetailDto} from "../../model/dto/InstrumentAccreditationDetailDto";
import {InstrumentRepairDetailDto} from "../../model/dto/InstrumentRepairDetailDto";
import {InstrumentUsageDetailDto} from "../../model/dto/InstrumentUsageDetailDto";

@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.css']
})
export class InstrumentDetailComponent {
  measuringInstrumentDetailDto: MeasuringInstrumentDetailDto | undefined;
  instrumentImageLinks: string[] = [];
  technicalCharacteristics: TechnicalCharacteristicDetailDto[] = [];
  attachedDocuments: AttachedDocumentDetailDto[] = [];
  instrumentAccreditations: InstrumentAccreditationDetailDto[] = [];
  instrumentRepairs: InstrumentRepairDetailDto[] = [];
  instrumentUsages: InstrumentUsageDetailDto[] = [];


  constructor(private _instrumentService: InstrumentService,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(value => {
      const id = value['id'];
      this.findDtoById(id);
      this.findAllImageLinks(id);
      this.findAllTechnicalCharacteristics(id);
      this.findAllAttachedDocuments(id);
      this.findAllAccreditations(id);
      this.findAllRepairs(id);
      this.findAllUsages(id);
    })
  }

  public findDtoById(id: number) {
    const observer: Observer<MeasuringInstrumentDetailDto> = {
      next: (data: MeasuringInstrumentDetailDto) => {
        this.measuringInstrumentDetailDto = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findDtoById(id).subscribe(observer);
  }

  public findAllImageLinks(id: number) {
    const observer: Observer<string[]> = {
      next: (data: string[]) => {
        this.instrumentImageLinks = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllImageLinks(id).subscribe(observer);
  }

  public findAllTechnicalCharacteristics(id: number) {
    const observer: Observer<TechnicalCharacteristicDetailDto[]> = {
      next: (data: TechnicalCharacteristicDetailDto[]) => {
        this.technicalCharacteristics = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllTechnicalCharacteristics(id).subscribe(observer);
  }

  public findAllAttachedDocuments(id: number) {
    const observer: Observer<AttachedDocumentDetailDto[]> = {
      next: (data: AttachedDocumentDetailDto[]) => {
        this.attachedDocuments = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllAttachedDocuments(id).subscribe(observer);
  }

  public findAllAccreditations(id: number) {
    const observer: Observer<InstrumentAccreditationDetailDto[]> = {
      next: (data: InstrumentAccreditationDetailDto[]) => {
        this.instrumentAccreditations = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllAccreditations(id).subscribe(observer);
  }

  public findAllRepairs(id: number) {
    const observer: Observer<InstrumentRepairDetailDto[]> = {
      next: (data: InstrumentRepairDetailDto[]) => {
        this.instrumentRepairs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllRepairs(id).subscribe(observer);
  }

  public findAllUsages(id: number) {
    const observer: Observer<InstrumentUsageDetailDto[]> = {
      next: (data: InstrumentUsageDetailDto[]) => {
        this.instrumentUsages = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllUsages(id).subscribe(observer);
  }
}
