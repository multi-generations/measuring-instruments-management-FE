import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InstrumentForwardService} from "../../service/instrument-forward.service";
import {ConstantsService} from "../../../../shared/service/constants.service";
import {InstrumentForwardForm} from "../../model/form/InstrumentForwardForm";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-instrument-forward-update',
  templateUrl: './instrument-forward-update.component.html',
  styleUrls: ['./instrument-forward-update.component.css']
})
export class InstrumentForwardUpdateComponent implements OnChanges{
  @Input()
  instrumentForwardId: number = 0
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(private instrumentForwardService: InstrumentForwardService,
              private _constantsService: ConstantsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instrumentForwardId']) {
      this.updateForm();
    }
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

  updateForm() {
    if (this.instrumentForwardId != 0) {
      this.instrumentForwardService.findDtoById(this.instrumentForwardId).subscribe(next => {
        this.mainForm.get('forwardDate')?.setValue(this.formatDate(next.forwardDate));
        this.mainForm.get('receiveUnit')?.setValue(next.receiveUnit);
        this.mainForm.get('sender')?.setValue(next.sender);
        this.mainForm.get('receiver')?.setValue(next.receiver);
        this.mainForm.get('issuingAuthority')?.setValue(next.issuingAuthority);
        this.mainForm.get('commandNumber')?.setValue(next.commandNumber);
        this.mainForm.get('instrumentForwardStatus')?.setValue(next.instrumentForwardStatus);
        this.mainForm.get('forwardNote')?.setValue(next.forwardNote);
      })
    }
  }

  initInstrumentForwardForm(): InstrumentForwardForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        id: this.instrumentForwardId,
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
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (instrumentForwardForm != null) {
          this.instrumentForwardService.update(this.instrumentForwardId, instrumentForwardForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Lịch sử giao nhận đã được cập nhật!',
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
              html: '<p>Cập nhật không thành công! </p><p>(' + error.message + ')</p>',
              icon: 'error'
            });
            this.resultChange = false;
          })
        }
      }
    });
  }

  resetForm() {
    this.mainForm = this.createForm();
    this.updateForm();
  }

  closeModal() {
    this.emitResult.emit(this.resultChange);
    this.mainForm = this.createForm();
  }

  closeModalBtnClick() {
    document.getElementById('instrument-forward-update-modal-close-btn')?.click();
  }

  formatDate(curDate: Date): string | null {
    return new DatePipe('en-US').transform(curDate, 'yyyy-MM-dd');
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
