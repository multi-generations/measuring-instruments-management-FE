import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import { MeasuringInstrumentDetailDto } from '../../model/dto/detail/MeasuringInstrumentDetailDto';
import { InstrumentService } from '../../service/instrument.service';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InstrumentAccreditationDetailDto } from '../../model/dto/detail/InstrumentAccreditationDetailDto';
import { InstrumentRepairDetailDto } from '../../model/dto/detail/InstrumentRepairDetailDto';
import { InstrumentUsageDetailDto } from '../../model/dto/detail/InstrumentUsageDetailDto';
import { InstrumentForwardDetailDto } from '../../model/dto/detail/InstrumentForwardDetailDto';
import { DocumentVolatilityDetailDto } from '../../model/dto/detail/DocumentVolatilityDetailDto';

@Component({
  selector: 'app-instrument-detail-nfc-chip',
  templateUrl: './instrument-detail-nfc-chip.component.html',
  styleUrls: ['./instrument-detail-nfc-chip.component.css'],
})
export class InstrumentDetailNfcChipComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  measuringInstrumentDetailDto: MeasuringInstrumentDetailDto | undefined;
  instrumentAccreditations: InstrumentAccreditationDetailDto[] = [];
  instrumentRepairs: InstrumentRepairDetailDto[] = [];
  instrumentUsages: InstrumentUsageDetailDto[] = [];
  instrumentForwards: InstrumentForwardDetailDto[] = [];
  documentVolatiles: DocumentVolatilityDetailDto[] = [];

  lastDocumentVolatileRecord: DocumentVolatilityDetailDto | undefined;
  lastForwardRecord: InstrumentForwardDetailDto | undefined;
  lastRepairRecord: InstrumentRepairDetailDto | undefined;
  lastAccreditationRecord: InstrumentAccreditationDetailDto | undefined;
  lastUsageRecord: InstrumentUsageDetailDto | undefined;
  lastUpdatedAt: Date;
  resultChange: boolean = false;

  constructor(
    private _instrumentService: InstrumentService,
    private _activatedRoute: ActivatedRoute,
    private _constantsService: ConstantsService
  ) {
    this._activatedRoute.params.subscribe((value) => {
      const id = value['id'];
      if (id) {
        this.findDtoById(id);
        this.findAllDocumentVolatiles(id);
        this.findAllInstrumentForwards(id);
        this.findAllAccreditations(id);
        this.findAllRepairs(id);
        this.findAllUsages(id);
      }
    });
    this.lastUpdatedAt = new Date();
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
      complete: () => {},
    };

    this._instrumentService.findDtoById(id).subscribe(observer);
  }

  public findAllDocumentVolatiles(id: number) {
    const observer: Observer<DocumentVolatilityDetailDto[]> = {
      next: (data: DocumentVolatilityDetailDto[]) => {
        this.documentVolatiles = data;
        this.lastDocumentVolatileRecord =
          this.documentVolatiles.length > 0
            ? this.documentVolatiles[this.documentVolatiles.length - 1]
            : undefined;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {},
    };

    this._instrumentService.findAllDocumentVolatility(id).subscribe(observer);
  }

  public findAllInstrumentForwards(id: number) {
    const observer: Observer<InstrumentForwardDetailDto[]> = {
      next: (data: InstrumentForwardDetailDto[]) => {
        this.instrumentForwards = data;
        this.lastForwardRecord =
          this.instrumentForwards.length > 0
            ? this.instrumentForwards[this.instrumentForwards.length - 1]
            : undefined;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {},
    };

    this._instrumentService.findAllForwards(id).subscribe(observer);
  }

  public findAllAccreditations(id: number) {
    const observer: Observer<InstrumentAccreditationDetailDto[]> = {
      next: (data: InstrumentAccreditationDetailDto[]) => {
        this.instrumentAccreditations = data;
        this.lastAccreditationRecord =
          this.instrumentAccreditations.length > 0
            ? this.instrumentAccreditations[this.instrumentAccreditations.length - 1]
            : undefined;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {},
    };

    this._instrumentService.findAllAccreditations(id).subscribe(observer);
  }

  public findAllRepairs(id: number) {
    const observer: Observer<InstrumentRepairDetailDto[]> = {
      next: (data: InstrumentRepairDetailDto[]) => {
        this.instrumentRepairs = data;
        this.lastRepairRecord =
          this.instrumentRepairs.length > 0
            ? this.instrumentRepairs[this.instrumentRepairs.length - 1]
            : undefined;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {},
    };

    this._instrumentService.findAllRepairs(id).subscribe(observer);
  }

  public findAllUsages(id: number) {
    const observer: Observer<InstrumentUsageDetailDto[]> = {
      next: (data: InstrumentUsageDetailDto[]) => {
        this.instrumentUsages = data;
        this.lastUsageRecord =
          this.instrumentUsages.length > 0
            ? this.instrumentUsages[this.instrumentUsages.length - 1]
            : undefined;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {},
    };

    this._instrumentService.findAllUsages(id).subscribe(observer);
  }

  submit() {}

  closeModal() {
    this.emitResult.emit(this.resultChange);
  }

  closeModalBtnClick() {
    document
      .getElementById('instrument-detail-nfc-chip-modal-close-btn')
      ?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
