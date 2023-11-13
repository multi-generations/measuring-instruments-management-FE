import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import Swal from 'sweetalert2';
import { InstrumentAccreditationForm } from '../../model/form/InstrumentAccreditationForm';
import { InstrumentAccreditationService } from '../../service/instrument-accreditation.service';

@Component({
  selector: 'app-instrument-accreditation-update',
  templateUrl: './instrument-accreditation-update.component.html',
  styleUrls: ['./instrument-accreditation-update.component.css'],
})
export class InstrumentAccreditationUpdateComponent {
  @Input()
  instrumentAccreditationId: number = 0;
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(
    private instrumentAccreditationService: InstrumentAccreditationService,
    private _constantsService: ConstantsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instrumentAccreditationId']) {
      this.updateForm();
    } else {
      (this.updateForm());
    }
  }

  createForm() {
    return new FormGroup({
      accreditationDate: new FormControl('', [Validators.required]),
      validAccreditationEndDate: new FormControl('', [Validators.required]),
      accreditationPlace: new FormControl('', [Validators.required]),
      accreditationResult: new FormControl('', [Validators.required]),
      accreditationConfirmNumber: new FormControl('', [Validators.required]),
      accreditor: new FormControl('', [Validators.required]),
      accreditationNote: new FormControl(''),
    });
  }

  updateForm() {
    if (this.instrumentAccreditationId != 0) {
      this.instrumentAccreditationService
        .findDtoById(this.instrumentAccreditationId)
        .subscribe((next) => {
          this.mainForm
            .get('accreditationDate')
            ?.setValue(this.formatDate(next.accreditationDate));
          this.mainForm
            .get('validAccreditationEndDate')
            ?.setValue(this.formatDate(next.validAccreditationEndDate));
          this.mainForm
            .get('accreditationPlace')
            ?.setValue(next.accreditationPlace);
          this.mainForm
            .get('accreditationResult')
            ?.setValue(next.accreditationResult);
          this.mainForm
            .get('accreditationConfirmNumber')
            ?.setValue(next.accreditationConfirmNumber);
          this.mainForm.get('accreditor')?.setValue(next.accreditor);
          this.mainForm
            .get('accreditationNote')
            ?.setValue(next.accreditationNote);
        });
    }
  }

  initInstrumentAccreditationForm(): InstrumentAccreditationForm | null {
    if (this.mainForm.valid) {
      return {
        accreditationDate: this.mainForm.get('accreditationDate')?.value,
        validAccreditationEndDate: this.mainForm.get(
          'validAccreditationEndDate'
        )?.value,
        accreditationPlace: this.mainForm.get('accreditationPlace')?.value,
        accreditationResult: this.mainForm.get('accreditationResult')?.value,
        accreditationConfirmNumber: this.mainForm.get(
          'accreditationConfirmNumber'
        )?.value,
        accreditor: this.mainForm.get('accreditor')?.value,
        accreditationNote: this.mainForm.get('accreditationNote')?.value,
        measuringInstrument: { id: this.measuringInstrumentId },
      };
    }

    return null;
  }

  submit() {
    let instrumentAccreditationForm = this.initInstrumentAccreditationForm();
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (instrumentAccreditationForm != null) {
          this.instrumentAccreditationService
            .update(this.instrumentAccreditationId, instrumentAccreditationForm)
            .subscribe(
              (next) => {
                console.log(next);
                Swal.fire({
                  position: 'center',
                  title: 'Thành công!',
                  text: 'Lịch sử kiểm định đã được cập nhật!',
                  icon: 'success',
                  timer: 200,
                  showConfirmButton: false,
                });
                this.resultChange = true;
                this.closeModalBtnClick();
              },
              (error: HttpErrorResponse) => {
                Swal.fire({
                  position: 'center',
                  title: 'Lỗi!',
                  html:
                    '<p>Cập nhật không thành công! </p><p>(' +
                    error.message +
                    ')</p>',
                  icon: 'error',
                });
                this.resultChange = false;
              }
            );
        }
      },
    });
  }

  resetForm() {
    this.mainForm = this.createForm();
    console.log(this.mainForm);
    this.updateForm();
  }

  closeModal() {
    this.emitResult.emit(this.resultChange);
    this.mainForm = this.createForm();
  }

  closeModalBtnClick() {
    document
      .getElementById('instrument-accreditation-update-modal-close-btn')
      ?.click();
  }

  formatDate(curDate: Date): string | null {
    return new DatePipe('en-US').transform(curDate, 'yyyy-MM-dd');
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
