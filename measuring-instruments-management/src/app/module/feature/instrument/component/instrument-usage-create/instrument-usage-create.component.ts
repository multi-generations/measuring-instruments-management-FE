import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/module/shared/service/constants.service';
import Swal from 'sweetalert2';
import { InstrumentUsageForm } from '../../model/form/InstrumentUsageForm';
import { InstrumentUsageService } from '../../service/instrument-usage-service';

@Component({
  selector: 'app-instrument-usage-create',
  templateUrl: './instrument-usage-create.component.html',
  styleUrls: ['./instrument-usage-create.component.css'],
})
export class InstrumentUsageCreateComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = new FormGroup({});

  resultChange: boolean = false;

  constructor(
    private instrumentUsageService: InstrumentUsageService,
    private _constantsService: ConstantsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.mainForm = new FormGroup({
      monitorDate: new FormControl('', [Validators.required]),
      workingDuration: new FormControl('', [Validators.required]),
      instrumentUser: new FormControl('', [Validators.required]),
      instrumentStatus: new FormControl('', [Validators.required]),
      usageNote: new FormControl(''),
    });
  }

  initInstrumentUsageForm(): InstrumentUsageForm | null {
    if (this.mainForm.valid) {
      return {
        monitorDate: this.mainForm.get('monitorDate')?.value,
        workingDuration: this.mainForm.get('workingDuration')?.value,
        instrumentUser: this.mainForm.get('instrumentUser')?.value,
        instrumentStatus: this.mainForm.get('instrumentStatus')?.value,
        usageNote: this.mainForm.get('usageNote')?.value,
        measuringInstrument: { id: this.measuringInstrumentId },
      };
    }

    return null;
  }

  submit() {
    let instrumentUsageForm = this.initInstrumentUsageForm();
    console.log(instrumentUsageForm);
    Swal.fire({
      title: 'Đang thêm mới...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (instrumentUsageForm != null) {
          this.instrumentUsageService.create(instrumentUsageForm).subscribe(
            (next) => {
              Swal.fire({
                position: 'center',
                title: 'Thành công!',
                text: 'Đã thêm mới Theo dõi sử dụng thành công!',
                icon: 'success',
                timer: 200,
                showConfirmButton: false,
              });
              this.resultChange = true;
              this.closeModalClick();
            },
            (error: HttpErrorResponse) => {
              Swal.fire({
                position: 'center',
                title: 'Lỗi!',
                html:
                  '<p>Thêm mới không thành công! </p><p>(' +
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
