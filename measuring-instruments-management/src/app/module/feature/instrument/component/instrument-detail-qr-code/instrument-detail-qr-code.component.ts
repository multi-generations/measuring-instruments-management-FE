import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import { InstrumentService } from '../../service/instrument.service';
import { MeasuringInstrumentDetailDto } from '../../model/dto/detail/MeasuringInstrumentDetailDto';
import { TechnicalCharacteristicDetailDto } from '../../model/dto/detail/TechnicalCharacteristicDetailDto';
import { AttachedDocumentDetailDto } from '../../model/dto/detail/AttachedDocumentDetailDto';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
              private _constantsService: ConstantsService) {
    if (this.measuringInstrumentId !== 0) {
      this.findDtoById(this.measuringInstrumentId);
    }
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


  // initAttachedDocumentForm(): AttachedDocumentForm | null {
  //   if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
  //     return {
  //       documentName: this.mainForm.get('documentName')?.value,
  //       documentSymbol: this.mainForm.get('documentSymbol')?.value,
  //       quantity: +this.mainForm.get('quantity')?.value,
  //       documentNote: this.mainForm.get('documentNote')?.value,
  //       measuringInstrument: {
  //         id: this.measuringInstrumentId
  //       }
  //     };
  //   }

  //   return null;
  // }

  submit() {
    // let attachedDocumentForm = this.initAttachedDocumentForm();
    // Swal.fire({
    //   title: 'Đang thêm mới...',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //     if (attachedDocumentForm != null) {
    //       this.attachedDocumentService.create(attachedDocumentForm).subscribe(next => {
    //         Swal.fire({
    //           position: 'center',
    //           title: 'Thành công!',
    //           text: 'Tài liệu đã được thêm!',
    //           icon: 'success',
    //           timer: 200,
    //           showConfirmButton: false
    //         });
    //         this.resultChange = true;
    //         this.closeModalBtnClick();
    //       }, (error: HttpErrorResponse) => {
    //         Swal.fire({
    //           position: 'center',
    //           title: 'Lỗi!',
    //           html: '<p>Thêm mới không thành công! </p><p>(' + error.message + ')</p>',
    //           icon: 'error'
    //         });
    //         this.resultChange = false;
    //       })
    //     }
    //   }
    // });
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
