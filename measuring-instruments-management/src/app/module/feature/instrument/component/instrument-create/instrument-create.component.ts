import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {InstrumentGroupService} from "../../service/instrument-group.service";
import {InstrumentStatusService} from "../../service/instrument-status.service";
import {InstrumentGroup} from "../../model/entity/InstrumentGroup";
import {ManagementUnit} from "../../model/entity/ManagementUnit";
import {AccreditationCenter} from "../../model/entity/AccreditationCenter";
import {InstrumentStatus} from "../../model/entity/InstrumentStatus";
import {ManagementUnitService} from "../../service/management-unit.service";
import {AccreditationCenterService} from "../../service/accreditation-center.service";
import {ConstantsService} from "../../../../shared/service/constants.service";
import {MeasuringInstrumentForm} from "../../model/form/MeasuringInstrumentForm";
import {InstrumentService} from "../../service/instrument.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-instrument-create',
    templateUrl: './instrument-create.component.html',
    styleUrls: ['./instrument-create.component.css']
})
export class InstrumentCreateComponent implements OnInit {
    mainForm: FormGroup = new FormGroup({});
    instrumentGroupList: InstrumentGroup[] = [];
    managementUnitList: ManagementUnit[] = [];
    accreditationCenterList: AccreditationCenter[] = [];
    instrumentStatusList: InstrumentStatus[] = [];
    managementLevelList: string[] = ['Bộ Quốc Phòng', 'Không'];
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
                private router: Router) {
    }

    ngOnInit(): void {
        this.createForm();
        this.initInstrumentGroupList();
        this.initManagementUnitList();
        this.initInstrumentStatusList();
        this.initYearList();
        this.initCountryList();
        this.initQuantityLevelList();
        this.initAccreditationCenterList();
    }

    createForm() {
        this.mainForm = new FormGroup({
            instrumentGroup: new FormControl('', [Validators.required]),
            instrumentName: new FormControl('', [Validators.required]),
            instrumentSymbol: new FormControl('', [Validators.required]),
            instrumentSerialNumber: new FormControl('', [Validators.required]),
            managementLevel: new FormControl('', [Validators.required]),
            manufactureCountry: new FormControl('', [Validators.required]),
            manufactureYear: new FormControl('', [Validators.required]),
            inServiceDate: new FormControl('', [Validators.required, this.isMoreThanToday]),
            managementUnit: new FormControl('', [Validators.required]),
            weaponGuarantee: new FormControl('', [Validators.required]),
            accreditationCycle: new FormControl('', [Validators.required, Validators.max(120)]),
            accreditationCenter: new FormControl('', [Validators.required]),
            qualityLevel: new FormControl('', [Validators.required]),
            instrumentStatus: new FormControl('', [Validators.required]),
            detailedDescription: new FormControl('', [])
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
                inServiceDate: new Date(this.mainForm.get('inServiceDate')?.value),
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
            title: 'Đang thêm mới...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                if (measuringInstrumentForm != null) {
                    this.instrumentService.create(measuringInstrumentForm).subscribe(next => {
                        Swal.fire({
                            position: 'center',
                            title: 'Thành công!',
                            text: 'Phương tiệm đã được thêm!',
                            icon: 'success',
                            timer: 200,
                            showConfirmButton: false
                        });
                    }, (error: HttpErrorResponse) => {
                        console.log(error);
                        Swal.fire({
                            position: 'center',
                            title: 'Lỗi!',
                            html: '<p>Thêm mới không thành công! </p><p>(' + error.message + ')</p>',
                            icon: 'error'
                        })
                    }, () => {
                        this.router.navigateByUrl('/instruments');
                    })
                }
            }
        });
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
