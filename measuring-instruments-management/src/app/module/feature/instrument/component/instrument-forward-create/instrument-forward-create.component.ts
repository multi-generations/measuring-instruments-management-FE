import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConstantsService} from "../../../../shared/service/constants.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {InstrumentForwardService} from "../../service/instrument-forward.service";
import {InstrumentForwardForm} from "../../model/form/InstrumentForwardForm";

@Component({
  selector: 'app-instrument-forward-create',
  templateUrl: './instrument-forward-create.component.html',
  styleUrls: ['./instrument-forward-create.component.css']
})
export class InstrumentForwardCreateComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(private instrumentForwardService: InstrumentForwardService,
              private _constantsService: ConstantsService) {
  }

  createForm() {
    return new FormGroup({
      forwardDate: new FormControl('', [Validators.required]),
      receiveUnit: new FormControl('', [Validators.required]),
      sender: new FormControl('', [Validators.required]),
      receiver: new FormControl('', [Validators.required]),
      issuingAuthority: new FormControl('', [Validators.required]),
      commandNumber: new FormControl('', [Validators.required]),
      instrumentForwardStatus: new FormControl('', [Validators.required]),
      forwardNote: new FormControl('')
    })
  }

  initInstrumentForwardForm(): InstrumentForwardForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        forwardDate: this.mainForm.get('forwardDate')?.value,
        receiveUnit: this.mainForm.get('receiveUnit')?.value,
        sender: this.mainForm.get('sender')?.value,
        receiver: this.mainForm.get('receiver')?.value,
        issuingAuthority: this.mainForm.get('issuingAuthority')?.value,
        commandNumber: this.mainForm.get('commandNumber')?.value,
        instrumentForwardStatus: this.mainForm.get('instrumentForwardStatus')?.value,
        forwardNote: this.mainForm.get('forwardNote')?.value,
        measuringInstrument: {
          id: this.measuringInstrumentId
        }
      };
    }

    return null;
  }

  submit() {
    let instrumentForwardForm = this.initInstrumentForwardForm();
    Swal.fire({
      title: 'Đang thêm mới...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (instrumentForwardForm != null) {
          this.instrumentForwardService.create(instrumentForwardForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Lịch sử giao nhận đã được thêm!',
              icon: 'success',
              timer: 200,
              showConfirmButton: false
            });
            this.resultChange = true;
            this.closeModalBtnClick();
          }, (error: HttpErrorResponse) => {
            Swal.fire({
              position: 'center',
              title: 'Lỗi!',
              html: '<p>Thêm mới không thành công! </p><p>(' + error.message + ')</p>',
              icon: 'error'
            });
            this.resultChange = false;
          })
        }
      }
    });
  }

  closeModal() {
    this.emitResult.emit(this.resultChange);
    this.mainForm = this.createForm();
  }

  closeModalBtnClick() {
    document.getElementById('instrument-forward-create-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
