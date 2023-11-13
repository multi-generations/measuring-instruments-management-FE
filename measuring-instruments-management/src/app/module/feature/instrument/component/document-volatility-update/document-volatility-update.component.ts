import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttachedDocumentDetailDto} from "../../model/dto/detail/AttachedDocumentDetailDto";
import {DocumentVolatilityService} from "../../service/document-volatility.service";
import {InstrumentService} from "../../service/instrument.service";
import {ConstantsService} from "../../../../shared/service/constants.service";
import {DocumentVolatilityForm} from "../../model/form/DocumentVolatilityForm";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-document-volatility-update',
  templateUrl: './document-volatility-update.component.html',
  styleUrls: ['./document-volatility-update.component.css']
})
export class DocumentVolatilityUpdateComponent implements OnChanges, OnInit{
  @Input()
  documentVolatilityId: number = 0
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  attachedDocuments: AttachedDocumentDetailDto[] = [];

  constructor(private documentVolatilityService: DocumentVolatilityService,
              private instrumentService: InstrumentService,
              private _constantsService: ConstantsService) {
  }

  ngOnInit(): void {
    this.initAttachedDocuments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentVolatilityId']) {
      this.updateForm();
    }
  }

  createForm() {
    return new FormGroup({
      volatilityDate: new FormControl('', [Validators.required]),
      attachedDocument: new FormControl('', [Validators.required]),
      volatilityPurpose: new FormControl('', [Validators.required]),
      quantity: new FormControl('')
    })
  }

  updateForm() {
    if (this.documentVolatilityId != 0) {
      this.documentVolatilityService.findDtoById(this.documentVolatilityId).subscribe(next => {
        this.mainForm.get('volatilityDate')?.setValue(this.formatDate(next.volatilityDate));
        this.mainForm.get('attachedDocument')?.setValue(next.attachedDocument.id);
        this.mainForm.get('volatilityPurpose')?.setValue(next.volatilityPurpose);
        this.mainForm.get('quantity')?.setValue(next.quantity);
      })
    }
  }

  resetForm() {
    this.mainForm = this.createForm();
    this.updateForm();
  }

  initDocumentVolatilityForm(): DocumentVolatilityForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        id: this.documentVolatilityId,
        volatilityDate: this.mainForm.get('volatilityDate')?.value,
        attachedDocument: this.mainForm.get('attachedDocument')?.value,
        volatilityPurpose: this.mainForm.get('volatilityPurpose')?.value,
        quantity: +this.mainForm.get('quantity')?.value,
        measuringInstrument: {
          id: this.measuringInstrumentId
        }
      };
    }

    return null;
  }

  submit() {
    let documentVolatilityForm = this.initDocumentVolatilityForm();
    Swal.fire({
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (documentVolatilityForm != null) {
          this.documentVolatilityService.update(this.documentVolatilityId, documentVolatilityForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Biến động tài liệu đã được cập nhật!',
              icon: 'success',
              timer: 200,
              showConfirmButton: false
            });
            this.resultChange = true;
            this.closeModalBtnClick();
          }, (error: HttpErrorResponse) => {
            Swal.fire({
              position: 'center',
              title: 'Lỗi!',
              html: '<p>Cập nhật không thành công! </p><p>(' + error.message + ')</p>',
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
    this.mainForm = this.createForm();
  }

  closeModalBtnClick() {
    document.getElementById('document-volatility-update-create-modal-close-btn')?.click();
  }

  initAttachedDocuments() {
    this.instrumentService.findAllAttachedDocuments(this.measuringInstrumentId).subscribe(next => {
      this.attachedDocuments = next;
    })
  }

  formatDate(curDate: Date): string | null {
    return new DatePipe('en-US').transform(curDate, 'yyyy-MM-dd');
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
