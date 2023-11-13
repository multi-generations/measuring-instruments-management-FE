import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import Swal from 'sweetalert2';
import { InstrumentRepairForm } from '../../model/form/InstrumentRepairForm';
import { InstrumentRepairService } from '../../service/instrument-repair.service';

@Component({
  selector: 'app-instrument-repair-update',
  templateUrl: './instrument-repair-update.component.html',
  styleUrls: ['./instrument-repair-update.component.css']
})
export class InstrumentRepairUpdateComponent {
  @Input()
  instrumentRepairId: number = 0
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(private instrumentRepairService: InstrumentRepairService,
              private _constantsService: ConstantsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instrumentRepairId']) {
      this.updateForm();
    }
  }

  createForm() {
    return new FormGroup({
      repairDate: new FormControl('', [Validators.required]),
      instrumentCondition: new FormControl('', [Validators.required]),
      repairReason: new FormControl('', [Validators.required]),
      repairResult: new FormControl('', [Validators.required]),
      repairPlace: new FormControl('', [Validators.required]),
      repairer: new FormControl('', [Validators.required]),
      repairNote: new FormControl(''),
    })
  }

  updateForm() {
    if (this.instrumentRepairId != 0) {
      this.instrumentRepairService.findDtoById(this.instrumentRepairId).subscribe(next => {
        this.mainForm.get('repairDate')?.setValue(this.formatDate(next.repairDate));
        this.mainForm.get('instrumentCondition')?.setValue(next.instrumentCondition);
        this.mainForm.get('repairReason')?.setValue(next.repairReason);
        this.mainForm.get('repairResult')?.setValue(next.repairResult);
        this.mainForm.get('repairPlace')?.setValue(next.repairPlace);
        this.mainForm.get('repairer')?.setValue(next.repairer);
        this.mainForm.get('repairNote')?.setValue(next.repairNote);
      })
    }
  }

  initInstrumentRepairForm(): InstrumentRepairForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        id: this.instrumentRepairId,
        repairDate: this.mainForm.get('repairDate')?.value,
        instrumentCondition: this.mainForm.get('instrumentCondition')?.value,
        repairReason: this.mainForm.get('repairReason')?.value,
        repairResult: this.mainForm.get('repairResult')?.value,
        repairPlace: this.mainForm.get('repairPlace')?.value,
        repairer: this.mainForm.get('repairer')?.value,
        repairNote: this.mainForm.get('repairNote')?.value,
        measuringInstrument: { id: this.measuringInstrumentId },
      };
    }

    return null;
  }

  submit() {
    let instrumentRepairForm = this.initInstrumentRepairForm();
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (instrumentRepairForm != null) {
          this.instrumentRepairService.update(this.instrumentRepairId, instrumentRepairForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Lịch sử sửa chữa đã được cập nhật!',
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
    document.getElementById('instrument-repair-update-modal-close-btn')?.click();
  }

  formatDate(curDate: Date): string | null {
    return new DatePipe('en-US').transform(curDate, 'yyyy-MM-dd');
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
} 
