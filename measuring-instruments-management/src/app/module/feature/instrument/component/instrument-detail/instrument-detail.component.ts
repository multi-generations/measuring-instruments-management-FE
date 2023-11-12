import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MeasuringInstrumentDetailDto} from "../../model/dto/detail/MeasuringInstrumentDetailDto";
import {Observer} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {InstrumentService} from "../../service/instrument.service";
import {ActivatedRoute} from "@angular/router";
import {TechnicalCharacteristicDetailDto} from "../../model/dto/detail/TechnicalCharacteristicDetailDto";
import {AttachedDocumentDetailDto} from "../../model/dto/detail/AttachedDocumentDetailDto";
import {InstrumentAccreditationDetailDto} from "../../model/dto/detail/InstrumentAccreditationDetailDto";
import {InstrumentRepairDetailDto} from "../../model/dto/detail/InstrumentRepairDetailDto";
import {InstrumentUsageDetailDto} from "../../model/dto/detail/InstrumentUsageDetailDto";
import {Carousel} from "bootstrap";
import {ConstantsService} from "../../../../shared/service/constants.service";
import Swal from "sweetalert2";
import {TechnicalCharacteristicService} from "../../service/technical-characteristic.service";
import {AttachedDocumentService} from "../../service/attached-document.service";
import {InstrumentForwardDetailDto} from "../../model/dto/detail/InstrumentForwardDetailDto";
import {InstrumentForwardService} from "../../service/instrument-forward.service";
import { InstrumentAccreditationService } from '../../service/instrument-accreditation.service';
import { InstrumentRepairService } from '../../service/instrument-repair.service';
import { InstrumentUsageService } from '../../service/instrument-usage-service';

@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.css']
})
export class InstrumentDetailComponent implements OnInit{
  @ViewChild('carousel', {static: false}) carousel: ElementRef | undefined;

  curId: number = 0
  measuringInstrumentDetailDto: MeasuringInstrumentDetailDto | undefined;
  instrumentImageLinks: string[] = [];
  technicalCharacteristics: TechnicalCharacteristicDetailDto[] = [];
  attachedDocuments: AttachedDocumentDetailDto[] = [];
  instrumentAccreditations: InstrumentAccreditationDetailDto[] = [];
  instrumentRepairs: InstrumentRepairDetailDto[] = [];
  instrumentUsages: InstrumentUsageDetailDto[] = [];
  instrumentForwards: InstrumentForwardDetailDto[] = [];
  instrumentImageActiveSrc = '';
  technicalCharacteristicIdUpdate = 0;
  attachedDocumentIdUpdate = 0;
  instrumentForwardIdUpdate = 0;
  instrumentAccreditationIdUpdate = 0;
  instrumentRepairIdUpdate = 0;
  instrumentUsageIdUpdate = 0;

  constructor(private _instrumentService: InstrumentService,
              private _activatedRoute: ActivatedRoute,
              public constantsService: ConstantsService,
              private technicalCharacteristicService: TechnicalCharacteristicService,
              private attachedDocumentService: AttachedDocumentService,
              private instrumentForwardService: InstrumentForwardService,
              private instrumentAccreditationService: InstrumentAccreditationService,
              private instrumentRepairService: InstrumentRepairService,
              private instrumentUsageService: InstrumentUsageService) {
    this._activatedRoute.params.subscribe(value => {
      const id = value['id'];
      if (id) {
        this.curId = +id;
        this.findDtoById(id);
        this.findAllImageLinks(id);
        this.findAllTechnicalCharacteristics(id);
        this.findAllAttachedDocuments(id);
        this.findAllInstrumentForwards(id);
        this.findAllAccreditations(id);
        this.findAllRepairs(id);
        this.findAllUsages(id);
      }
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

  public findAllInstrumentForwards(id: number) {
    const observer: Observer<InstrumentForwardDetailDto[]> = {
      next: (data: InstrumentForwardDetailDto[]) => {
        this.instrumentForwards = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.status);
        console.log(err.message);
      },
      complete: () => {
      }
    }

    this._instrumentService.findAllForwards(id).subscribe(observer);
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
      carousel.addEventListener('slid.bs.carousel', () => {
        this.activeImageList();
      })
    }
  }

  // Update
  setTechnicalCharacteristicIdUpdate(id: number) {
    this.technicalCharacteristicIdUpdate = id;
  }

  setAttachedDocumentIdUpdate(id: number) {
    this.attachedDocumentIdUpdate = id;
  }

  setInstrumentForwardIdUpdate(id: number) {
    this.instrumentForwardIdUpdate = id;
  }

  setInstrumentAccreditationIdUpdate(id: number) {
    this.instrumentAccreditationIdUpdate = id;
  }

  setInstrumentRepairIdUpdate(id: number) {
    this.instrumentRepairIdUpdate = id;
  }

  setInstrumentUsageIdUpdate(id: number) {
    this.instrumentUsageIdUpdate = id;
  }

  // Delete

  public showDeleteModal(id: number, deleteType: string) {
    let modalBody = this.constantsService.NOT_CHOOSE_FOR_DELETE;

    switch (deleteType) {
      case 'technicalCharacteristic':
        modalBody = this.setModalBodyTechnicalCharacteristic(id);
        break;
      case 'attachedDocument':
        modalBody = this.setModalBodyAttachedDocument(id);
        break;
      case 'instrumentForward':
        modalBody = this.setModalBodyInstrumentForward(id);
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
      width: '80vw',
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
              case 'instrumentForward':
                this.deleteInstrumentForwardById(id);
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
        }).then();
      }
    })
  }

  public setModalBodyTechnicalCharacteristic(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-2">Loại thiết bị</th>' +
      '<th class="col-2">Tên kỹ thuật</th>' +
      '<th class="col-2">Điểm đo đầu</th>' +
      '<th class="col-1">Đơn vị điểmầu</th>' +
      '<th class="col-22">Điểm đo cuối</th>' +
      '<th class="col-1">Đơn vị điểm cuối</th>' +
      '<th class="col-1">Phương sai</th>' +
      '<th class="col-1">Đơn vị phương sai</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteTechnicalCharacteristic = this.technicalCharacteristics.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-2">${deleteTechnicalCharacteristic?.instrumentType.instrumentTypeName}</td>` +
      `<td class="col-2">${deleteTechnicalCharacteristic?.technicalType.technicalTypeName}</td>` +
      `<td class="col-2">${deleteTechnicalCharacteristic?.measuringRangeStart}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringUnitStart.measuringUnitName}</td>` +
      `<td class="col-2">${deleteTechnicalCharacteristic?.measuringRangeEnd}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringUnitEnd.measuringUnitName}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringError}</td>` +
      `<td class="col-1">${deleteTechnicalCharacteristic?.measuringErrorUnit.measuringUnitName}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteTechnicalCharacteristicById(id: number) {
    this.technicalCharacteristicService.deleteById(id).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thành công!',
        text: 'Xóa thành công!',
        icon: 'success',
        timer: 200,
        showConfirmButton: false
      });
      this.findAllTechnicalCharacteristics(this.curId);
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        title: 'Lỗi!',
        html: '<p>Xóa không thành công! </p><p>(' + error.message + ')</p>',
        icon: 'error'
      })
    });
  }

  public setModalBodyAttachedDocument(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-4">Tên tài liệu</th>' +
      '<th class="col-2">Ký hiệu</th>' +
      '<th class="col-1">Số lượng</th>' +
      '<th class="col-5">Ghi chú</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteAttachedDocument = this.attachedDocuments.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-4">${deleteAttachedDocument?.documentName}</td>` +
      `<td class="col-2">${deleteAttachedDocument?.documentSymbol}</td>` +
      `<td class="col-1">${deleteAttachedDocument?.quantity}</td>` +
      `<td class="col-5">${deleteAttachedDocument?.documentNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteAttachedDocumentById(id: number) {
    this.attachedDocumentService.deleteById(id).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thành công!',
        text: 'Xóa thành công!',
        icon: 'success',
        timer: 200,
        showConfirmButton: false
      });
      this.findAllAttachedDocuments(this.curId);
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        title: 'Lỗi!',
        html: '<p>Xóa không thành công! </p><p>(' + error.message + ')</p>',
        icon: 'error'
      })
    });
  }

  public setModalBodyInstrumentForward(id: number) {
    let modalBody =
      '<div class="overflow-auto" style="max-height: 30vh; min-width: 500px">' +
      '<table class="table text-center">' +
      '<thead>' +
      '<tr class="col-12">' +
      '<th class="col-1">Ngày giao nhận</th>' +
      '<th class="col-2">Đơn vị nhận</th>' +
      '<th class="col-1">Người giao</th>' +
      '<th class="col-1">Người nhận</th>' +
      '<th class="col-2">Cơ quan phát lệnh</th>' +
      '<th class="col-1">Số lệnh</th>' +
      '<th class="col-2">Tình trạng</th>' +
      '<th class="col-2">Ghi chú</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    const deleteInstrumentForward = this.instrumentForwards.find(value => value.id === id);

    modalBody += '<tr class="col-12">' +
      `<td class="col-1">${deleteInstrumentForward?.forwardDate}</td>` +
      `<td class="col-2">${deleteInstrumentForward?.receiveUnit}</td>` +
      `<td class="col-1">${deleteInstrumentForward?.sender}</td>` +
      `<td class="col-1">${deleteInstrumentForward?.receiver}</td>` +
      `<td class="col-2">${deleteInstrumentForward?.issuingAuthority}</td>` +
      `<td class="col-1">${deleteInstrumentForward?.commandNumber}</td>` +
      `<td class="col-2">${deleteInstrumentForward?.instrumentForwardStatus}</td>` +
      `<td class="col-2">${deleteInstrumentForward?.forwardNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteInstrumentForwardById(id: number) {
    this.instrumentForwardService.deleteById(id).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thành công!',
        text: 'Xóa thành công!',
        icon: 'success',
        timer: 200,
        showConfirmButton: false
      });
      this.findAllInstrumentForwards(this.curId);
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        title: 'Lỗi!',
        html: '<p>Xóa không thành công! </p><p>(' + error.message + ')</p>',
        icon: 'error'
      })
    });
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
      '<th class="col-2">Kết quả</th>' +
      '<th class="col-1">Số xác nhận</th>' +
      '<th class="col-1">Ngày hết hiệu lực</th>' +
      '<th class="col-3">Ghi chú</th>' +
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
    this.instrumentAccreditationService.deleteById(id).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thành công!',
        text: 'Xóa thành công!',
        icon: 'success',
        timer: 200,
        showConfirmButton: false
      });
      this.findAllAccreditations(this.curId);
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        title: 'Lỗi!',
        html: '<p>Xóa không thành công! </p><p>(' + error.message + ')</p>',
        icon: 'error'
      })
    });
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
      `<td class="col-2">${deleteInstrumentRepair?.repairReason}</td>` +
      `<td class="col-2">${deleteInstrumentRepair?.instrumentCondition}</td>` +
      `<td class="col-2">${deleteInstrumentRepair?.repairResult}</td>` +
      `<td class="col-1">${deleteInstrumentRepair?.repairPlace}</td>` +
      `<td class="col-1">${deleteInstrumentRepair?.repairer}</td>` +
      `<td class="col-3">${deleteInstrumentRepair?.repairNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteInstrumentRepairById(id: number) {
    this.instrumentRepairService.deleteById(id).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thành công!',
        text: 'Xóa thành công!',
        icon: 'success',
        timer: 200,
        showConfirmButton: false
      });
      this.findAllRepairs(this.curId);
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        title: 'Lỗi!',
        html: '<p>Xóa không thành công! </p><p>(' + error.message + ')</p>',
        icon: 'error'
      })
    });
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
      `<td class="col-4">${deleteInstrumentUsage?.instrumentStatus}</td>` +
      `<td class="col-1">${deleteInstrumentUsage?.workingDuration}</td>` +
      `<td class="col-3">${deleteInstrumentUsage?.instrumentUser}</td>` +
      `<td class="col-3">${deleteInstrumentUsage?.usageNote}</td>` +
      '</tr></body></table></div>'

    return modalBody;
  }

  public deleteInstrumentUsageById(id: number) {
    this.instrumentUsageService.deleteById(id).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thành công!',
        text: 'Xóa thành công!',
        icon: 'success',
        timer: 200,
        showConfirmButton: false
      });
      this.findAllUsages(this.curId);
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        title: 'Lỗi!',
        html: '<p>Xóa không thành công! </p><p>(' + error.message + ')</p>',
        icon: 'error'
      })
    });
  }

  checkResult(typeChange: string, resultChange: boolean) {
    if (resultChange) {
      switch (typeChange) {
        case 'technical-characteristic':
          this.findAllTechnicalCharacteristics(this.curId);
          break;
        case 'attached-document':
          this.findAllAttachedDocuments(this.curId);
          break;
        case 'instrument-forward':
          this.findAllInstrumentForwards(this.curId);
          break;
        case 'instrument-usage':
          this.findAllUsages(this.curId);
          break;
        case 'instrument-repair':
          this.findAllRepairs(this.curId);
          break;
        case 'instrument-accreditation':
          this.findAllAccreditations(this.curId);
          break;
      }
    }
  }
}
