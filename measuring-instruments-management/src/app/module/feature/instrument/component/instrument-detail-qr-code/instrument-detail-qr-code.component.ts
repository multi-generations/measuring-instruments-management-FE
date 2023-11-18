import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import { InstrumentService } from '../../service/instrument.service';
import { MeasuringInstrumentDetailDto } from '../../model/dto/detail/MeasuringInstrumentDetailDto';
import { TechnicalCharacteristicDetailDto } from '../../model/dto/detail/TechnicalCharacteristicDetailDto';
import { AttachedDocumentDetailDto } from '../../model/dto/detail/AttachedDocumentDetailDto';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instrument-detail-qr-code',
  templateUrl: './instrument-detail-qr-code.component.html',
  styleUrls: ['./instrument-detail-qr-code.component.css']
})
export class InstrumentDetailQrCodeComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  measuringInstrumentDetailDto: MeasuringInstrumentDetailDto | undefined;
  instrumentImageLinks: string[] = [];
  technicalCharacteristics: TechnicalCharacteristicDetailDto[] = [];
  attachedDocuments: AttachedDocumentDetailDto[] = [];
  resultChange: boolean = false;

  constructor(private _instrumentService: InstrumentService,
              private _activatedRoute: ActivatedRoute,
              private _constantsService: ConstantsService) {
    this._activatedRoute.params.subscribe(value => {
      const id = value['id'];
      if (id) {
        this.findDtoById(id);
        this.findAllTechnicalCharacteristics(id);
        this.findAllAttachedDocuments(id);
      }
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


  submit() {
    
  }

  closeModal() {
    this.emitResult.emit(this.resultChange);
  }

  closeModalBtnClick() {
    document.getElementById('instrument-detail-qr-code-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
