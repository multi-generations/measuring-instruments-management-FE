import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import { InstrumentUsageService } from '../../service/instrument-usage-service';
import { InstrumentUsageForm } from '../../model/form/InstrumentUsageForm';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-usage-update',
  templateUrl: './instrument-usage-update.component.html',
  styleUrls: ['./instrument-usage-update.component.css']
})
export class InstrumentUsageUpdateComponent {
  @Input()
  instrumentUsageId: number = 0
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(private instrumentUsageService: InstrumentUsageService,
              private _constantsService: ConstantsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instrumentUsageId']) {
      this.updateForm();
    }
  }

  createForm() {
    return new FormGroup({
      monitorDate: new FormControl('', [Validators.required]),
      workingDuration: new FormControl('', [Validators.required]),
      instrumentUser: new FormControl('', [Validators.required]),
      instrumentStatus: new FormControl('', [Validators.required]),
      usageNote: new FormControl(''),
    })
  }

  updateForm() {
    if (this.instrumentUsageId != 0) {
      this.instrumentUsageService.findDtoById(this.instrumentUsageId).subscribe(next => {
        this.mainForm.get('monitorDate')?.setValue(this.formatDate(next.monitorDate));
        this.mainForm.get('workingDuration')?.setValue(next.workingDuration);
        this.mainForm.get('instrumentUser')?.setValue(next.instrumentUser);
        this.mainForm.get('instrumentStatus')?.setValue(next.instrumentStatus);
        this.mainForm.get('usageNote')?.setValue(next.usageNote);
      })
    }
  }

  initInstrumentUsageForm(): InstrumentUsageForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        id: this.instrumentUsageId,
        monitorDate: this.mainForm.get('monitorDate')?.value,
        workingDuration: this.mainForm.get('workingDuration')?.value,
        instrumentUser: this.mainForm.get('instrumentUser')?.value,
        instrumentStatus: this.mainForm.get('instrumentStatus')?.value,
        usageNote: this.mainForm.get('usageNote')?.value,
        measuringInstrument: {
          id: this.measuringInstrumentId
        }
      };
    }

    return null;
  }

  submit() {
    let instrumentUsageForm = this.initInstrumentUsageForm();
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (instrumentUsageForm != null) {
          this.instrumentUsageService.update(this.instrumentUsageId, instrumentUsageForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Lịch sử sử dụng đã được cập nhật!',
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
    document.getElementById('instrument-usage-update-modal-close-btn')?.click();
  }

  formatDate(curDate: Date): string | null {
    return new DatePipe('en-US').transform(curDate, 'yyyy-MM-dd');
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
