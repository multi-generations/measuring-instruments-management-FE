import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import { InstrumentAccreditationForm } from '../../model/form/InstrumentAccreditationForm';

@Component({
  selector: 'app-instrument-accreditation-create',
  templateUrl: './instrument-accreditation-create.component.html',
  styleUrls: ['./instrument-accreditation-create.component.css'],
})
export class InstrumentAccreditationCreateComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = new FormGroup({});

  resultChange: boolean = false;

  constructor(private _constantsService: ConstantsService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.mainForm = new FormGroup({
      accreditationDate: new FormControl('', [Validators.required]),
      validAccreditationEndDate: new FormControl('', [Validators.required]),
      accreditationPlace: new FormControl('', [Validators.required]),
      accreditationResult: new FormControl('', [Validators.required]),
      accreditationConfirmNumber: new FormControl('', [Validators.required]),
      accreditor: new FormControl('', [Validators.required]),
      accreditationNote: new FormControl('', [Validators.required]),
    });
  }

  initInstrumentUsageForm(): InstrumentAccreditationForm | null {
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
    let instrumentUsageForm = this.initInstrumentUsageForm();
    console.log(instrumentUsageForm);
    // Swal.fire({
    //   title: 'Đang thêm mới...',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //     if (instrumentUsageForm != null) {
    //       this.technicalCharacteristicService
    //         .create(technicalCharacteristicForm)
    //         .subscribe(
    //           (next) => {
    //             Swal.fire({
    //               position: 'center',
    //               title: 'Thành công!',
    //               text: 'Đặc điểm đã được thêm!',
    //               icon: 'success',
    //               timer: 200,
    //               showConfirmButton: false,
    //             });
    //             this.resultChange = true;
    //             this.closeModalClick();
    //           },
    //           (error: HttpErrorResponse) => {
    //             Swal.fire({
    //               position: 'center',
    //               title: 'Lỗi!',
    //               html:
    //                 '<p>Thêm mới không thành công! </p><p>(' +
    //                 error.message +
    //                 ')</p>',
    //               icon: 'error',
    //             });
    //             this.resultChange = false;
    //           }
    //         );
    //     }
    //   },
    // });
  }

  closeModal() {
    this.emitResult.emit(this.resultChange);
    this.createForm();
  }

  closeModalClick() {
    document
      .getElementById('instrument-accreditation-create-modal-close-btn')
      ?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
