import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {InstrumentGroup} from "../../model/InstrumentGroup";
import {InstrumentType} from "../../model/InstrumentType";
import {InstrumentStatus} from "../../model/InstrumentStatus";
import {InstrumentService} from "../../service/instrument.service";
import {Observer} from "rxjs";
import {InstrumentGroupService} from "../../service/instrument-group.service";
import {InstrumentTypeService} from "../../service/instrument-type.service";
import {InstrumentStatusService} from "../../service/instrument-status.service";
import Swal from "sweetalert2";
import {MeasuringInstrumentSearchForm} from "../../model/MeasuringInstrumentSearchForm";

@Component({
  selector: 'app-instrument-search',
  templateUrl: './instrument-search.component.html',
  styleUrls: ['./instrument-search.component.css']
})
export class InstrumentSearchComponent {
  @Output()
  emitSearchValue: EventEmitter<MeasuringInstrumentSearchForm> = new EventEmitter<MeasuringInstrumentSearchForm>();
  searchForm: FormGroup;
  instrumentGroups: InstrumentGroup[] = [];
  instrumentTypes: InstrumentType[] = [];
  instrumentStatuses: InstrumentStatus[] = [];

  constructor(private _instrumentGroupService: InstrumentGroupService,
              private _instrumentTypeService: InstrumentTypeService,
              private _instrumentStatusService: InstrumentStatusService) {
    this.searchForm = new FormGroup({
      multipleSearch: new FormControl(''),
      instrumentGroupId: new FormControl(''),
      instrumentTypeId: new FormControl(''),
      instrumentStatusId: new FormControl(''),
      startInServiceDate: new FormControl(''),
      endInServiceDate: new FormControl('')
    });

    this.findAllInstrumentGroups();
    this.findAllInstrumentTypes();
    this.findAllInstrumentStatuses();
  }

  public findAllInstrumentGroups() {
    const observer: Observer<InstrumentGroup[]> = {
      next: data => {
        this.instrumentGroups = data;
      },
      error: err => {
        Swal.fire({
          position: 'center',
          title: 'Lỗi!',
          html: '<p>Có lỗi xảy ra! </p><p>(' + err.message + ')</p>',
          icon: 'error'
        })
      },
      complete: () => {}
    }

    this._instrumentGroupService.findAll().subscribe(observer);
  }

  public findAllInstrumentTypes() {
    const observer: Observer<InstrumentType[]> = {
      next: data => {
        this.instrumentTypes = data;
      },
      error: err => {
        Swal.fire({
          position: 'center',
          title: 'Lỗi!',
          html: '<p>Có lỗi xảy ra! </p><p>(' + err.message + ')</p>',
          icon: 'error'
        })
      },
      complete: () => {}
    }

    this._instrumentTypeService.findAll().subscribe(observer);
  }

  public findAllInstrumentStatuses() {
    const observer: Observer<InstrumentStatus[]> = {
      next: data => {
        this.instrumentStatuses = data;
      },
      error: err => {
        Swal.fire({
          position: 'center',
          title: 'Lỗi!',
          html: '<p>Có lỗi xảy ra! </p><p>(' + err.message + ')</p>',
          icon: 'error'
        })
      },
      complete: () => {}
    }

    this._instrumentStatusService.findAll().subscribe(observer);
  }

  public submit() {
    this.emitSearchValue.emit(this.searchForm.value);
  }
}
