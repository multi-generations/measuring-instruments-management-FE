import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {InstrumentGroup} from "../../model/entity/InstrumentGroup";
import {ManagementUnit} from "../../model/entity/ManagementUnit";
import {AccreditationCenter} from "../../model/entity/AccreditationCenter";
import {InstrumentStatus} from "../../model/entity/InstrumentStatus";
import {InstrumentService} from "../../service/instrument.service";
import {InstrumentGroupService} from "../../service/instrument-group.service";
import {ManagementUnitService} from "../../service/management-unit.service";
import {AccreditationCenterService} from "../../service/accreditation-center.service";
import {InstrumentStatusService} from "../../service/instrument-status.service";
import {ConstantsService} from "../../../../shared/service/constants.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MeasuringInstrumentForm} from "../../model/form/MeasuringInstrumentForm";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-instrument-update',
  templateUrl: './instrument-update.component.html',
  styleUrls: ['./instrument-update.component.css']
})
export class InstrumentUpdateComponent implements OnInit {
  curId: number = 0;
  mainForm: FormGroup = new FormGroup({});
  instrumentGroupList: InstrumentGroup[] = [];
  managementUnitList: ManagementUnit[] = [];
  accreditationCenterList: AccreditationCenter[] = [];
  instrumentStatusList: InstrumentStatus[] = [];
  managementLevelList: string[] = ['BQP', 'Không'];
  yearList: number[] = [];
  countryList: string[] = [];
  quantityLevelList: number[] = [];

  // Custom Invalid Mess
  invalidMessNumberToBig = 'Không được quá 120 tháng (10 năm)!'

  constructor(private instrumentService: InstrumentService,
              private instrumentGroupService: InstrumentGroupService,
              private managementUnitService: ManagementUnitService,
              private accreditationCenterService: AccreditationCenterService,
              private instrumentStatusService: InstrumentStatusService,
              private _constantsService: ConstantsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initInstrumentGroupList();
    this.initManagementUnitList();
    this.initInstrumentStatusList();
    this.initYearList();
    this.initCountryList();
    this.initQuantityLevelList();
    this.initAccreditationCenterList();
    this.createForm();
  }

  createForm() {
    this.activatedRoute.params.subscribe(params => {
      this.curId = +params['id'];

      this.instrumentService.findDtoById(this.curId).subscribe(next => {
        console.log(next);
        this.mainForm = new FormGroup({
          instrumentGroup: new FormControl(next.instrumentGroup?.id, []),
          instrumentName: new FormControl(next.instrumentName, [Validators.required]),
          instrumentSymbol: new FormControl(next.instrumentSymbol, [Validators.required]),
          instrumentSerialNumber: new FormControl(next.instrumentSerialNumber, [Validators.required]),
          managementLevel: new FormControl(next.managementLevel, []),
          manufactureCountry: new FormControl(next.manufactureCountry, []),
          manufactureYear: new FormControl(next.manufactureYear ? next.manufactureYear : '', []),
          inServiceDate: new FormControl(this.formatDate(next.inServiceDate), [this.isMoreThanToday]),
          managementUnit: new FormControl(next.managementUnit?.id, [Validators.required]),
          weaponGuarantee: new FormControl(next.weaponGuarantee, []),
          accreditationCycle: new FormControl(next.accreditationCycle, [Validators.required, Validators.max(120)]),
          accreditationCenter: new FormControl(next.accreditationCenter?.id, []),
          qualityLevel: new FormControl(next.qualityLevel, []),
          instrumentStatus: new FormControl(next.instrumentStatus?.id, []),
          detailedDescription: new FormControl(next.detailedDescription, [])
        })
      })
    })


  }

  initInstrumentGroupList() {
    this.instrumentGroupService.findAll().subscribe(next => {
      this.instrumentGroupList = next;
    })
  }

  initManagementUnitList() {
    this.managementUnitService.findAll().subscribe(next => {
      this.managementUnitList = next;
    })
  }

  initAccreditationCenterList() {
    this.accreditationCenterService.findAll().subscribe(next => {
      this.accreditationCenterList = next;
    })
  }

  initInstrumentStatusList() {
    this.instrumentStatusService.findAll().subscribe(next => {
      this.instrumentStatusList = next;
    })
  }

  initYearList() {
    this.yearList = this._constantsService.YEAR_LIST;
  }

  initCountryList() {
    this.countryList = this._constantsService.COUNTRY_LIST;
  }

  initQuantityLevelList() {
    this.quantityLevelList = this._constantsService.QUANTITY_LEVEL_LIST;
  }

  formatDate(curDate: Date): string | null {
    return new DatePipe('en-US').transform(curDate, 'yyyy-MM-dd');
  }

  initMeasuringInstrumentForm(): MeasuringInstrumentForm | null {
    if (this.mainForm.valid) {
      return {
        instrumentGroup: this.instrumentGroupList.find(value => value.id === +this.mainForm.get('instrumentGroup')?.value),
        instrumentName: this.mainForm.get('instrumentName')?.value,
        instrumentSymbol: this.mainForm.get('instrumentSymbol')?.value,
        instrumentSerialNumber: this.mainForm.get('instrumentSerialNumber')?.value,
        managementLevel: this.mainForm.get('managementLevel')?.value,
        manufactureCountry: this.mainForm.get('manufactureCountry')?.value,
        manufactureYear: +this.mainForm.get('manufactureYear')?.value,
        inServiceDate: this.mainForm.get('inServiceDate')?.value,
        managementUnit: this.managementUnitList.find(value => value.id === +this.mainForm.get('managementUnit')?.value),
        weaponGuarantee: this.mainForm.get('weaponGuarantee')?.value,
        accreditationCycle: +this.mainForm.get('accreditationCycle')?.value,
        accreditationCenter: this.accreditationCenterList.find(value => value.id === +this.mainForm.get('accreditationCenter')?.value),
        qualityLevel: +this.mainForm.get('qualityLevel')?.value,
        instrumentStatus: this.instrumentStatusList.find(value => value.id === +this.mainForm.get('instrumentStatus')?.value),
        detailedDescription: this.mainForm.get('detailedDescription')?.value,
      };
    }

    return null;
  }

  submit() {
    let measuringInstrumentForm = this.initMeasuringInstrumentForm();
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (measuringInstrumentForm != null) {
          this.instrumentService.update(this.curId, measuringInstrumentForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Phương tiện đã được cập nhật!',
              icon: 'success',
              timer: 200,
              showConfirmButton: false
            });
          }, (error: HttpErrorResponse) => {
            console.log(error);
            Swal.fire({
              position: 'center',
              title: 'Lỗi!',
              html: '<p>Cập nhật không thành công! </p><p>(' + error.message + ')</p>',
              icon: 'error'
            })
          }, () => {
            this.router.navigateByUrl(`/instruments/${this.curId}`);
          })
        }
      }
    });
  }

  cancelUpdate() {
    this.ngOnInit();
    window.scrollTo(0, 0);
  }


//   Custom validators
  isMoreThanToday(control: AbstractControl): ValidationErrors | null {
    const controlDate = new Date(control.value);
    const currentDate = new Date();
    if (controlDate > currentDate) {
      return {isMoreThanToday: true};
    }
    return null;
  }

//   Getters
  get constantsService(): ConstantsService {
    return this._constantsService;
  }

  protected readonly window = window;
}
