import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MeasuringInstrumentDetailDto} from "../../model/dto/MeasuringInstrumentDetailDto";
import {Observer} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {InstrumentService} from "../../service/instrument.service";
import {ActivatedRoute} from "@angular/router";
import {TechnicalCharacteristicDetailDto} from "../../model/dto/TechnicalCharacteristicDetailDto";
import {AttachedDocumentDetailDto} from "../../model/dto/AttachedDocumentDetailDto";
import {InstrumentAccreditationDetailDto} from "../../model/dto/InstrumentAccreditationDetailDto";
import {InstrumentRepairDetailDto} from "../../model/dto/InstrumentRepairDetailDto";
import {InstrumentUsageDetailDto} from "../../model/dto/InstrumentUsageDetailDto";
import {Carousel} from "bootstrap";
import {ConstantsService} from "../../../../shared/service/constants.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.css']
})
export class InstrumentDetailComponent implements OnInit{
  @ViewChild('carousel', {static: false}) carousel: ElementRef | undefined;

  measuringInstrumentDetailDto: MeasuringInstrumentDetailDto | undefined;
  instrumentImageLinks: string[] = [];
  technicalCharacteristics: TechnicalCharacteristicDetailDto[] = [];
  attachedDocuments: AttachedDocumentDetailDto[] = [];
  instrumentAccreditations: InstrumentAccreditationDetailDto[] = [];
  instrumentRepairs: InstrumentRepairDetailDto[] = [];
  instrumentUsages: InstrumentUsageDetailDto[] = [];
  instrumentImageActiveSrc = '';


  constructor(private _instrumentService: InstrumentService,
              private _activatedRoute: ActivatedRoute,
              public constantsService: ConstantsService) {
    this._activatedRoute.params.subscribe(value => {
      const id = value['id'];
      this.findDtoById(id);
      this.findAllImageLinks(id);
      this.findAllTechnicalCharacteristics(id);
      this.findAllAttachedDocuments(id);
      this.findAllAccreditations(id);
      this.findAllRepairs(id);
      this.findAllUsages(id);
    })
  }

  ngOnInit(): void {
        window.scrollTo(0, 0);
    }

  public findDtoById(id: number) {
    const observer: Observer<MeasuringInstrumentDetailDto> = {
      next: (data: MeasuringInstrumentDetailDto) => {
        this.measuringInstrumentDetailDto = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findDtoById(id).subscribe(observer);
  }

  public findAllImageLinks(id: number) {
    const observer: Observer<string[]> = {
      next: (data: string[]) => {
        this.instrumentImageLinks = data;
        this.instrumentImageActiveSrc = this.instrumentImageLinks[0];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllImageLinks(id).subscribe(observer);
  }

  public findAllTechnicalCharacteristics(id: number) {
    const observer: Observer<TechnicalCharacteristicDetailDto[]> = {
      next: (data: TechnicalCharacteristicDetailDto[]) => {
        this.technicalCharacteristics = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllTechnicalCharacteristics(id).subscribe(observer);
  }

  public findAllAttachedDocuments(id: number) {
    const observer: Observer<AttachedDocumentDetailDto[]> = {
      next: (data: AttachedDocumentDetailDto[]) => {
        this.attachedDocuments = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllAttachedDocuments(id).subscribe(observer);
  }

  public findAllAccreditations(id: number) {
    const observer: Observer<InstrumentAccreditationDetailDto[]> = {
      next: (data: InstrumentAccreditationDetailDto[]) => {
        this.instrumentAccreditations = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllAccreditations(id).subscribe(observer);
  }

  public findAllRepairs(id: number) {
    const observer: Observer<InstrumentRepairDetailDto[]> = {
      next: (data: InstrumentRepairDetailDto[]) => {
        this.instrumentRepairs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllRepairs(id).subscribe(observer);
  }

  public findAllUsages(id: number) {
    const observer: Observer<InstrumentUsageDetailDto[]> = {
      next: (data: InstrumentUsageDetailDto[]) => {
        this.instrumentUsages = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllUsages(id).subscribe(observer);
  }

  public activeImageList() {
    const instrumentImageDoms = document.getElementsByClassName('carousel-item');

    for (let i = 0; i < instrumentImageDoms.length; i++) {
      if (instrumentImageDoms[i].classList.contains('active')) {
        const src = instrumentImageDoms[i].querySelector('img')?.src;
        if (src) {
          this.instrumentImageActiveSrc = src;
          return;
        }
      }
    }
  }

  changeImage($event: MouseEvent) {
    const item = $event.target as HTMLImageElement;

    if (item) {
      this.instrumentImageActiveSrc = item.src
    }

    const carousel = new Carousel(this.carousel?.nativeElement);
    const index = item.id.substring(4);

    carousel.to(+index);
  }

  carouselSlide() {
    const carousel = document.querySelector('#carousel-instrument-image');
    if (carousel !== null) {
      carousel.addEventListener('slid.bs.carousel', ev => {
        this.activeImageList();
      })
    }
  }

  public showDeleteModal(id: number, deleteType: string) {
    let modalBody = this.constantsService.NOT_CHOOSE_FOR_DELETE;

    switch (deleteType) {
      case 'technicalCharacteristic':
        modalBody = this.setModalBodyTechnicalCharacteristic(id);
        break;
      case 'attachedDocument':
        modalBody = this.setModalBodyAttachedDocument(id);
        break;
      case 'instrumentAccreditation':
        modalBody = this.setModalBodyInstrumentAccreditation(id);
        break;
      case 'instrumentRepair':
        modalBody = this.setModalBodyInstrumentRepair(id);
        break;
      case 'instrumentUsage':
        modalBody = this.setModalBodyInstrumentUsage(id);
        break;
    }

    Swal.fire({
      position: 'center',
      title: 'Xác nhận bạn muốn xóa',
      width: '50vw',
      html: modalBody,
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
            switch (deleteType) {
              case 'technicalCharacteristic':
                this.deleteTechnicalCharacteristicById(id);
                break;
              case 'attachedDocument':
                this.deleteAttachedDocumentById(id);
                break;
              case 'instrumentAccreditation':
                this.deleteInstrumentAccreditationById(id);
                break;
              case 'instrumentRepair':
                this.deleteInstrumentRepairById(id);
                break;
              case 'instrumentUsage':
                this.deleteInstrumentUsageById(id);
                break;
            }
          }
        });
      }
    })
  }

  public setModalBodyTechnicalCharacteristic(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-4">Bắt buộc</th>' +
      '<th class="col-4">Cơ bản</th>' +
      '<th class="col-1">Đơn vị đo</th>' +
      '<th class="col-1">Khoảng đo</th>' +
      '<th class="col-1">Phương sai</th>' +
      '<th class="col-1">Độ không đảm bảo</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteTechnicalCharacteristic = this.technicalCharacteristics.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-4 text-start">${deleteTechnicalCharacteristic?.requiredCharacteristic}</td>` +
      `<td class="col-4 text-start">${deleteTechnicalCharacteristic?.basicCharacteristic}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringUnitName}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringRange}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringError}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringUncertainlyDegree}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteTechnicalCharacteristicById(id: number) {
    alert('delete');
  }

  public setModalBodyAttachedDocument(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-3">Phiên âm</th>' +
      '<th class="col-3">Tên gốc</th>' +
      '<th class="col-1">Ký hiệu</th>' +
      '<th class="col-1">Số lượng</th>' +
      '<th class="col-4">Ghi chú</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteAttachedDocument = this.attachedDocuments.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-3">${deleteAttachedDocument?.documentPhoneticName}</td>` +
      `<td class="col-3">${deleteAttachedDocument?.documentName}</td>` +
      `<td class="col-1">${deleteAttachedDocument?.documentSymbol}</td>` +
      `<td class="col-1">${deleteAttachedDocument?.quantity}</td>` +
      `<td class="col-4 text-start">${deleteAttachedDocument?.documentNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteAttachedDocumentById(id: number) {
    alert('delete');
  }

  public setModalBodyInstrumentAccreditation(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-1">Ngày kiểm định</th>' +
      '<th class="col-2">Nơi kiểm định</th>' +
      '<th class="col-2">Người kiểm định</th>' +
      '<th class="col-2 text-start">Kết quả</th>' +
      '<th class="col-1">Số xác nhận</th>' +
      '<th class="col-1">Ngày hết hiệu lực</th>' +
      '<th class="col-3 text-start">Ghi chú</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteInstrumentAccreditation = this.instrumentAccreditations.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-1">${deleteInstrumentAccreditation?.accreditationDate}</td>` +
      `<td class="col-2">${deleteInstrumentAccreditation?.accreditationPlace}</td>` +
      `<td class="col-2">${deleteInstrumentAccreditation?.accreditor}</td>` +
      `<td class="col-2">${deleteInstrumentAccreditation?.accreditationResult}</td>` +
      `<td class="col-1">${deleteInstrumentAccreditation?.accreditationConfirmNumber}</td>` +
      `<td class="col-1">${deleteInstrumentAccreditation?.validAccreditationEndDate}</td>` +
      `<td class="col-3">${deleteInstrumentAccreditation?.accreditationNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteInstrumentAccreditationById(id: number) {
    alert('delete');
  }

  public setModalBodyInstrumentRepair(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-1">Ngày sửa</th>' +
      '<th class="col-2">Nguyên nhân</th>' +
      '<th class="col-2">Tình trạng</th>' +
      '<th class="col-2">Kết quả</th>' +
      '<th class="col-1">Nơi sửa</th>' +
      '<th class="col-1">Người sửa</th>' +
      '<th class="col-3">Ghi chú</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteInstrumentRepair = this.instrumentRepairs.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-1">${deleteInstrumentRepair?.repairDate}</td>` +
      `<td class="col-2 text-start">${deleteInstrumentRepair?.repairReason}</td>` +
      `<td class="col-2 text-start">${deleteInstrumentRepair?.instrumentCondition}</td>` +
      `<td class="col-2 text-start">${deleteInstrumentRepair?.repairResult}</td>` +
      `<td class="col-1">${deleteInstrumentRepair?.repairPlace}</td>` +
      `<td class="col-1">${deleteInstrumentRepair?.repairer}</td>` +
      `<td class="col-3 text-start">${deleteInstrumentRepair?.repairNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteInstrumentRepairById(id: number) {
    alert('delete');
  }

  public setModalBodyInstrumentUsage(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-1">Ngày theo dõi</th>' +
      '<th class="col-4">Tình trạng</th>' +
      '<th class="col-1">Thời gian dùng</th>' +
      '<th class="col-3">Người dùng</th>' +
      '<th class="col-3">Ghi chú</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteInstrumentUsage = this.instrumentUsages.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-1">${deleteInstrumentUsage?.monitorDate}</td>` +
      `<td class="col-4 text-start">${deleteInstrumentUsage?.instrumentStatus}</td>` +
      `<td class="col-1">${deleteInstrumentUsage?.workingDuration}</td>` +
      `<td class="col-3">${deleteInstrumentUsage?.instrumentUser}</td>` +
      `<td class="col-3 text-start">${deleteInstrumentUsage?.usageNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteInstrumentUsageById(id: number) {
    alert('delete');
  }
}
