import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InstrumentType} from "../../model/entity/InstrumentType";
import {TechnicalType} from "../../model/entity/TechnicalType";
import {MeasuringUnit} from "../../model/entity/MeasuringUnit";
import {InstrumentTypeService} from "../../service/instrument-type.service";
import {TechnicalTypeService} from "../../service/technical-type.service";
import {MeasuringUnitService} from "../../service/measuring-unit.service";
import {TechnicalCharacteristicForm} from "../../model/form/TechnicalCharacteristicForm";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {TechnicalCharacteristicService} from "../../service/technical-characteristic.service";
import {ConstantsService} from "../../../../shared/service/constants.service";

@Component({
  selector: 'app-technical-characteristic-create',
  templateUrl: './technical-characteristic-create.component.html',
  styleUrls: ['./technical-characteristic-create.component.css']
})
export class TechnicalCharacteristicCreateComponent implements OnInit{
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = new FormGroup({});
  instrumentTypeList: InstrumentType[] = [];
  technicalTypeList: TechnicalType[] = [];
  measuringUnitList: MeasuringUnit[] = [];
  resultChange: boolean = false;

  constructor(private instrumentTypeService: InstrumentTypeService,
              private technicalTypeService: TechnicalTypeService,
              private measuringUnitService: MeasuringUnitService,
              private technicalCharacteristicService: TechnicalCharacteristicService,
              private _constantsService: ConstantsService) {
  }

  ngOnInit(): void {
    this.createForm();

    this.initInstrumentTypeList();
    this.initTechnicalTypeList();
    this.initMeasuringUnitList();
  }

  createForm() {
    this.mainForm = new FormGroup({
      instrumentType: new FormControl('', [Validators.required]),
      technicalType: new FormControl('', [Validators.required]),
      measuringRangeStart: new FormControl('', [Validators.required]),
      measuringUnitStart: new FormControl('', [Validators.required]),
      measuringRangeEnd: new FormControl('', [Validators.required]),
      measuringUnitEnd: new FormControl('', [Validators.required]),
      measuringError: new FormControl('', [Validators.required]),
      measuringErrorUnit: new FormControl('', [Validators.required]),
    })
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

  updateMeasuringUnitList() {
    const technicalTypeId = this.mainForm.get('technicalType')?.value;

    if (technicalTypeId) {
      this.measuringUnitService.findByTechnicalType(+technicalTypeId).subscribe(next => {
        this.measuringUnitList = next;
      })
    }
  }

  initTechnicalCharacteristicForm(): TechnicalCharacteristicForm | null {
    if (this.mainForm.valid) {
      return {
        instrumentType: this.instrumentTypeList.find(obj => obj.id === +this.mainForm.get('instrumentType')?.value),
        technicalType: this.technicalTypeList.find(obj => obj.id === +this.mainForm.get('technicalType')?.value),
        measuringRangeStart: +this.mainForm.get('measuringRangeStart')?.value,
        measuringUnitStart: this.measuringUnitList.find(obj => obj.id === +this.mainForm.get('measuringUnitStart')?.value),
        measuringRangeEnd: +this.mainForm.get('measuringRangeEnd')?.value,
        measuringUnitEnd: this.measuringUnitList.find(obj => obj.id === +this.mainForm.get('measuringUnitEnd')?.value),
        measuringError: +this.mainForm.get('measuringError')?.value,
        measuringErrorUnit: this.measuringUnitList.find(obj => obj.id === +this.mainForm.get('measuringErrorUnit')?.value),
        measuringInstrumentId: this.measuringInstrumentId
      };
    }

    return null;
  }

  submit() {
    let technicalCharacteristicForm = this.initTechnicalCharacteristicForm();
    Swal.fire({
      title: 'Đang thêm mới...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (technicalCharacteristicForm != null) {
          this.technicalCharacteristicService.create(technicalCharacteristicForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Đặc điểm đã được thêm!',
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
    this.createForm();
  }

  closeModalClick() {
    document.getElementById('technical-characteristic-create-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
