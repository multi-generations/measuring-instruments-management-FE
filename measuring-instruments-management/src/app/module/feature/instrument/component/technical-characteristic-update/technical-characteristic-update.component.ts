import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InstrumentType} from "../../model/entity/InstrumentType";
import {TechnicalType} from "../../model/entity/TechnicalType";
import {MeasuringUnit} from "../../model/entity/MeasuringUnit";
import {InstrumentTypeService} from "../../service/instrument-type.service";
import {TechnicalTypeService} from "../../service/technical-type.service";
import {MeasuringUnitService} from "../../service/measuring-unit.service";
import {TechnicalCharacteristicService} from "../../service/technical-characteristic.service";
import {ConstantsService} from "../../../../shared/service/constants.service";
import {TechnicalCharacteristicForm} from "../../model/form/TechnicalCharacteristicForm";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-technical-characteristic-update',
  templateUrl: './technical-characteristic-update.component.html',
  styleUrls: ['./technical-characteristic-update.component.css']
})
export class TechnicalCharacteristicUpdateComponent implements OnInit, OnChanges {
  @Input()
  technicalCharacteristicId: number = 0
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  instrumentTypeList: InstrumentType[] = [];
  technicalTypeList: TechnicalType[] = [];
  measuringUnitList: MeasuringUnit[] = [];
  measuringErrorUnitList: MeasuringUnit[] = [];
  resultChange: boolean = false;

  constructor(private instrumentTypeService: InstrumentTypeService,
              private technicalTypeService: TechnicalTypeService,
              private measuringUnitService: MeasuringUnitService,
              private technicalCharacteristicService: TechnicalCharacteristicService,
              private _constantsService: ConstantsService) {
  }

  ngOnInit(): void {
    this.initInstrumentTypeList();
    this.initTechnicalTypeList();
    this.initMeasuringUnitList();
    this.initMeasuringErrorUnitList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technicalCharacteristicId']) {
      this.updateForm();
    }
  }

  createForm() {
    return new FormGroup({
      instrumentType: new FormControl('', [Validators.required]),
      technicalType: new FormControl('', [Validators.required]),
      measuringRangeStart: new FormControl('', [Validators.required]),
      measuringUnitStart: new FormControl('', [Validators.required]),
      measuringRangeEnd: new FormControl('', [Validators.required]),
      measuringUnitEnd: new FormControl('', [Validators.required]),
      measuringError: new FormControl('', [Validators.required]),
      measuringErrorUnit: new FormControl('', [Validators.required])
    })
  }

  updateForm() {
    if (this.technicalCharacteristicId != 0) {
      this.technicalCharacteristicService.findDtoById(this.technicalCharacteristicId).subscribe(next => {
        this.mainForm.get('instrumentType')?.setValue(next.instrumentType?.id);
        this.mainForm.get('technicalType')?.setValue(next.technicalType?.id);
        this.mainForm.get('measuringRangeStart')?.setValue(next.measuringRangeStart);
        this.mainForm.get('measuringUnitStart')?.setValue(next.measuringUnitStart?.id);
        this.mainForm.get('measuringRangeEnd')?.setValue(next.measuringRangeEnd);
        this.mainForm.get('measuringUnitEnd')?.setValue(next.measuringUnitEnd?.id);
        this.mainForm.get('measuringError')?.setValue(next.measuringError);
        this.mainForm.get('measuringErrorUnit')?.setValue(next.measuringErrorUnit?.id);

        this.updateMeasuringUnitList();
        this.updateMeasuringErrorUnitList();
      })
    }
  }

  resetForm() {
    this.mainForm = this.createForm();
    this.updateForm();
  }

  initInstrumentTypeList() {
    this.instrumentTypeService.findAll().subscribe(next => {
      this.instrumentTypeList = next;
    })
  }

  initTechnicalTypeList() {
    this.technicalTypeService.findAll().subscribe(next => {
      this.technicalTypeList = next;
    })
  }

  initMeasuringUnitList() {
    this.measuringUnitService.findAll().subscribe(next => {
      this.measuringUnitList = next;
    })
  }

  initMeasuringErrorUnitList() {
    this.measuringUnitService.findAll().subscribe(next => {
      this.measuringErrorUnitList = next;
    })
  }

  updateMeasuringUnitList() {
    const technicalTypeId = this.mainForm.get('technicalType')?.value;
    console.log(technicalTypeId);

    if (technicalTypeId) {
      this.measuringUnitService.findByTechnicalType(+technicalTypeId).subscribe(next => {
        this.measuringUnitList = next;
      })
    }
  }

  updateMeasuringErrorUnitList() {
    const technicalTypeId = this.mainForm.get('technicalType')?.value;

    if (technicalTypeId) {
      this.measuringUnitService.findErrorUnitByTechnicalType(+technicalTypeId).subscribe(next => {
        this.measuringErrorUnitList = next;
      })
    }
  }

  initTechnicalCharacteristicForm(): TechnicalCharacteristicForm | null {
    if (this.mainForm.valid) {
      return {
        id: this.technicalCharacteristicId,
        instrumentType: this.instrumentTypeList.find(obj => obj.id === +this.mainForm.get('instrumentType')?.value),
        technicalType: this.technicalTypeList.find(obj => obj.id === +this.mainForm.get('technicalType')?.value),
        measuringRangeStart: +this.mainForm.get('measuringRangeStart')?.value,
        measuringUnitStart: this.measuringUnitList.find(obj => obj.id === +this.mainForm.get('measuringUnitStart')?.value),
        measuringRangeEnd: +this.mainForm.get('measuringRangeEnd')?.value,
        measuringUnitEnd: this.measuringUnitList.find(obj => obj.id === +this.mainForm.get('measuringUnitEnd')?.value),
        measuringError: +this.mainForm.get('measuringError')?.value,
        measuringErrorUnit: this.measuringErrorUnitList.find(obj => obj.id === +this.mainForm.get('measuringErrorUnit')?.value),
        measuringInstrument: {id: this.measuringInstrumentId}
      };
    }

    return null;
  }

  submit() {
    let technicalCharacteristicForm = this.initTechnicalCharacteristicForm();
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (technicalCharacteristicForm != null) {
          this.technicalCharacteristicService.update(this.technicalCharacteristicId, technicalCharacteristicForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Đặc điểm đã được cập nhật!',
              icon: 'success',
              timer: 200,
              showConfirmButton: false
            });
            this.resultChange = true;
            this.closeModalClick();
          }, (error: HttpErrorResponse) => {
            Swal.fire({
              position: 'center',
              title: 'Lỗi!',
              html: '<p>Cập nhật không thành công! </p><p>(' + error.message + ')</p>',
              icon: 'error'
            })
            this.resultChange = false;
          })
        }
      }
    });
  }

  resetModal() {
    this.emitResult.emit(this.resultChange);
    this.resetForm();
  }

  closeModalClick() {
    document.getElementById('technical-characteristic-update-modal-close-btn')?.click();
  }

  changeMeasuringUnit() {
    this.mainForm.get('measuringUnitStart')?.setValue('');
    this.mainForm.get('measuringUnitEnd')?.setValue('');
    this.mainForm.get('measuringErrorUnit')?.setValue('');
    this.updateMeasuringUnitList();
    this.updateMeasuringErrorUnitList();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
