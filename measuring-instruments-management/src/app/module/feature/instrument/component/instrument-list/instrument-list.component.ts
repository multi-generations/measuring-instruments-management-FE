import {Component, OnInit} from '@angular/core';
import {MeasuringInstrumentListDto} from "../../model/MeasuringInstrumentListDto";
import {InstrumentService} from "../../service/instrument.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observer} from "rxjs";
import {InstrumentGroup} from "../../model/InstrumentGroup";
import {InstrumentType} from "../../model/InstrumentType";

@Component({
    selector: 'app-instrument-list',
    templateUrl: './instrument-list.component.html',
    styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnInit {
    measuringInstrumentListDtos: MeasuringInstrumentListDto[] = [
        {
            id: 1,
            instrumentName: 'Tên',
            instrumentPhoneticName: 'jhdakjsd',
            instrumentGroup: {
                id: 1,
                instrumentGroupName: 'Nhóm 1'
            },
            instrumentType: {
                id: 1,
                instrumentTypeName: 'Loại 1'
            },
            instrumentSymbol: 'ạhdas',
            instrumentSerialNumber: '78346583',
            managementLevel: 'BQP',
            inServiceDate: new Date(),
            managementUnit: 'QK5',
            enabled: false
        }
    ];
    observer: Observer<MeasuringInstrumentListDto[]> = {
        next: (data: MeasuringInstrumentListDto[]) => {
            this.measuringInstrumentListDtos = data
        },
        error: (err: HttpErrorResponse) => {
            console.error(err.status);
            alert('Lỗi: ' + err.message);
        },
        complete: () => {
        }
    }
    isMultipleDelete = false;
    isCheckAll = false;

    constructor(private instrumentService: InstrumentService) {
    }

    ngOnInit(): void {
        this.instrumentService.findAll().subscribe(this.observer);
    }

    public checkAll($event: Event) {
        const checkAllInput = $event.target as HTMLInputElement;

        if (checkAllInput.checked) {
            this.measuringInstrumentListDtos.forEach(value => {
                value.enabled = true;
            })
        } else {
            this.measuringInstrumentListDtos.forEach(value => {
                value.enabled = false;
            })
        }

        this.checkAllEnabled();
    }

    public checkAllEnabled() {
        this.isCheckAll = !this.measuringInstrumentListDtos.every(value => {
            return (value.enabled === false);
        });

        this.checkMultipleDelete();
    }

    private checkMultipleDelete() {
        this.isMultipleDelete = this.measuringInstrumentListDtos.every(value => {
            return (value.enabled === true);
        });
    }
}
