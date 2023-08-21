import {Component, OnInit} from '@angular/core';
import {MeasuringInstrumentListDto} from "../../model/MeasuringInstrumentListDto";
import {InstrumentService} from "../../service/instrument.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observer} from "rxjs";
import {ConstantsService} from "../../../../shared/service/constants.service";
import Swal from "sweetalert2";
import {MeasuringInstrumentSearchForm} from "../../model/MeasuringInstrumentSearchForm";

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnInit{
  measuringInstrumentListDtos: MeasuringInstrumentListDto[] = [];
  isAnyItemIsEnable = false;
  isAllItemsEnabled = false;
  deleteIds: number[] = [];
  deleteInstruments: MeasuringInstrumentListDto[] = [];
  deleteModalBody = '';
  totalPages = 0;
  currentPage = 1;
  size = 5;

  constructor(private _instrumentService: InstrumentService,
              public constantsService: ConstantsService) {
  }

  ngOnInit(): void {
    this.findAll();
    this.deleteModalBody = this.constantsService.NOT_CHOOSE_FOR_DELETE;
  }

  public findAll(measuringInstrumentSearchForm?: MeasuringInstrumentSearchForm): void {
    let observer: Observer<any>;
    if (measuringInstrumentSearchForm === undefined) {
      observer = {
        next: data => {
          this.measuringInstrumentListDtos = data.content;
          this.totalPages = data.totalPages;
          if (this.deleteIds.length > 0) {
            this.measuringInstrumentListDtos.forEach(value => {
              if (this.deleteIds.includes(value.id)) {
                value.enabled = true;
              }
            })
            this.checkAnyItemIsEnabled();
            this.checkAllItemsIsEnabled();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.status);
          console.error(err.message);
        },
        complete: () => {
        }
      }
    } else {
      this.resetComponent();
      observer = {
        next: data => {
          this.measuringInstrumentListDtos = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.status);
          console.error(err.message);
        },
        complete: () => {
        }
      }
    }
    this._instrumentService.findAll(this.currentPage, this.size, measuringInstrumentSearchForm).subscribe(observer);
  }

  public enableAllItems() {
    this.measuringInstrumentListDtos.forEach(value => {
      value.enabled = this.isAllItemsEnabled;
      if (value.enabled) {
        if (!this.deleteIds.includes(value.id)) {
          this.deleteIds.push(value.id);
          this.deleteInstruments.push(value);
        }
      } else {
        if (this.deleteIds.includes(value.id)) {
          this.deleteIds.splice(this.deleteIds.indexOf(value.id), 1);
          this.deleteInstruments.splice(this.deleteInstruments.indexOf(value), 1);
        }
      }
    })
    this.isAnyItemIsEnable = this.isAllItemsEnabled;
  }

  public enableItem(id: number) {
    const item = this.measuringInstrumentListDtos.find(value => {
      return value.id === id
    });

    if (item !== undefined) {
      if (item.enabled) {
        if (!this.deleteIds.includes(id)) {
          this.deleteIds.push(id);
          this.deleteInstruments.push(item);
        }
      } else {
        if (this.deleteIds.includes(id)) {
          this.deleteIds.splice(this.deleteIds.indexOf(id), 1);
          this.deleteInstruments.splice(this.deleteInstruments.indexOf(item), 1);
        }
      }
    }

    this.checkAnyItemIsEnabled();
    this.checkAllItemsIsEnabled();
  }

  public checkAllItemsIsEnabled() {
    const checkEnabledFn = (value: MeasuringInstrumentListDto) => {
      return value.enabled === true;
    };
    this.isAllItemsEnabled = this.measuringInstrumentListDtos.every(checkEnabledFn);
  }

  public checkAnyItemIsEnabled() {
    const checkEnabledFn = (value: MeasuringInstrumentListDto) => {
      return value.enabled === true;
    };
    this.isAnyItemIsEnable = this.measuringInstrumentListDtos.some(checkEnabledFn);
  }

  public showDeleteModal(id: number | undefined) {
    if (id) {
      this.deleteIds = [id]
      this.measuringInstrumentListDtos.forEach(value => {
        value.enabled = false;
        if (value.id === id) {
          this.deleteInstruments = [value]
          value.enabled = true;
        }
      })
      this.checkAllItemsIsEnabled();
      this.checkAnyItemIsEnabled();
    }
    this.setModalBody();
    Swal.fire({
      position: 'center',
      title: 'Bạn muốn xóa các thiết bị',
      width: '50vw',
      html: this.deleteModalBody,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Đang xóa...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.deleteByIds();
          }
        });
      } else {
        this.measuringInstrumentListDtos.forEach(value => {
          value.enabled = false
        });
        this.deleteIds = [];
        this.deleteInstruments = [];
      }
    })
  }

  public setModalBody() {
    if (this.deleteIds.length > 0) {
      this.deleteModalBody =
        '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
        '<table class="table text-center">' +
        '<thead>' +
        '<tr class="col-12">' +
        '<th class="col-1">#</th>' +
        '<th class="col-3">Tên</th>' +
        '<th class="col-3">Phiên âm</th>' +
        '<th class="col-3">Số hiệu</th>' +
        '<th class="col-2">Ký hiệu</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';
      for (let measuringInstrument of this.deleteInstruments) {
        if (measuringInstrument) {
          this.deleteModalBody += '<tr class="col-12">' +
            `<td class="col-1">${this.deleteInstruments.indexOf(measuringInstrument) + 1}</td>` +
            `<td class="col-3">${measuringInstrument.instrumentName}</td>` +
            `<td class="col-3">${measuringInstrument.instrumentPhoneticName}</td>` +
            `<td class="col-3">${measuringInstrument.instrumentSerialNumber}</td>` +
            `<td class="col-2">${measuringInstrument.instrumentSymbol}</td>` +
            '</tr>'
        }
      }
      this.deleteModalBody += '</body></table></div>'
    } else {
      this.deleteModalBody = this.constantsService.NOT_CHOOSE_FOR_DELETE;
    }
  }

  public resetComponent() {
    this.isAnyItemIsEnable = false;
    this.isAllItemsEnabled = false;
    this.deleteIds = [];
    this.deleteInstruments = [];
    this.deleteModalBody = this.constantsService.NOT_CHOOSE_FOR_DELETE;
    this.totalPages = 0;
    this.currentPage = 1;
  }

  public deleteByIds() {
    const observer: Observer<void> = {
      next: () => {
        Swal.fire({
          position: 'center',
          title: 'Thành công!',
          text: 'Các thiết bị đã được xóa!',
          icon: 'success',
          timer: 200,
          showConfirmButton: false
        });
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          title: 'Lỗi!',
          html: '<p>Xóa không thành công! </p><p>(' + err.message + ')</p>',
          icon: 'error'
        })
      },
      complete: () => {
        this.resetComponent();
        this.findAll();
      }
    }
    this._instrumentService.deleteByIds(this.deleteIds).subscribe(observer);
  }

  public changePage($event: number) {
    this.currentPage = $event;
    this.findAll();
  }

  public search($event: MeasuringInstrumentSearchForm) {
    this.findAll($event);
  }
}
