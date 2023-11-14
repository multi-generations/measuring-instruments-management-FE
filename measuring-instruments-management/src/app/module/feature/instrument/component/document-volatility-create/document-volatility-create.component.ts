import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConstantsService} from "../../../../shared/service/constants.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {DocumentVolatilityService} from "../../service/document-volatility.service";
import {DocumentVolatilityForm} from "../../model/form/DocumentVolatilityForm";
import {AttachedDocumentDetailDto} from "../../model/dto/detail/AttachedDocumentDetailDto";
import {InstrumentService} from "../../service/instrument.service";

@Component({
  selector: 'app-document-volatility-create',
  templateUrl: './document-volatility-create.component.html',
  styleUrls: ['./document-volatility-create.component.css']
})
export class DocumentVolatilityCreateComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;


  constructor(private documentVolatilityService: DocumentVolatilityService,
              private instrumentService: InstrumentService,
              private _constantsService: ConstantsService) {
  }

  createForm() {
    return new FormGroup({
      volatilityDate: new FormControl('', [Validators.required]),
      attachedDocument: new FormControl('', [Validators.required]),
      volatilityPurpose: new FormControl('', []),
      quantity: new FormControl('')
    })
  }

  initDocumentVolatilityForm(): DocumentVolatilityForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
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
      title: 'Đang thêm mới...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (documentVolatilityForm != null) {
          this.documentVolatilityService.create(documentVolatilityForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Biến động tài liệu đã được thêm!',
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
    this.mainForm = this.createForm();
  }

  closeModalBtnClick() {
    document.getElementById('document-volatility-create-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
