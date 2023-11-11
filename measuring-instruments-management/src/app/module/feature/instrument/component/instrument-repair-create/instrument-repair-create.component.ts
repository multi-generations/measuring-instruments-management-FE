import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import { InstrumentRepairForm } from '../../model/form/InstrumentRepairForm';

@Component({
  selector: 'app-instrument-repair-create',
  templateUrl: './instrument-repair-create.component.html',
  styleUrls: ['./instrument-repair-create.component.css'],
})
export class InstrumentRepairCreateComponent {
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
      createdTime: new FormControl('', [Validators.required]),
      repairDate: new FormControl('', [Validators.required]),
      instrumentCondition: new FormControl('', [Validators.required]),
      repairReason: new FormControl('', [Validators.required]),
      repairResult: new FormControl('', [Validators.required]),
      repairPlace: new FormControl('', [Validators.required]),
      repairer: new FormControl('', [Validators.required]),
      repairNote: new FormControl('', [Validators.required]),
    });
  }

  initInstrumentUsageForm(): InstrumentRepairForm | null {
    if (this.mainForm.valid) {
      return {
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
    document.getElementById('instrument-usage-create-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}