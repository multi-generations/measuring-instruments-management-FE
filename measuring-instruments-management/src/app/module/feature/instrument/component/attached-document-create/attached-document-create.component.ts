import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConstantsService} from "../../../../shared/service/constants.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {AttachedDocumentForm} from "../../model/form/AttachedDocumentForm";
import {AttachedDocumentService} from "../../service/attached-document.service";

@Component({
  selector: 'app-attached-document-create',
  templateUrl: './attached-document-create.component.html',
  styleUrls: ['./attached-document-create.component.css']
})
export class AttachedDocumentCreateComponent {
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(private attachedDocumentService: AttachedDocumentService,
              private _constantsService: ConstantsService) {
  }

  createForm() {
    return new FormGroup({
      documentName: new FormControl('', [Validators.required]),
      documentSymbol: new FormControl('', []),
      quantity: new FormControl('', []),
      documentNote: new FormControl('')
    })
  }

  initAttachedDocumentForm(): AttachedDocumentForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        documentName: this.mainForm.get('documentName')?.value,
        documentSymbol: this.mainForm.get('documentSymbol')?.value,
        quantity: +this.mainForm.get('quantity')?.value,
        documentNote: this.mainForm.get('documentNote')?.value,
        measuringInstrument: {
          id: this.measuringInstrumentId
        }
      };
    }

    return null;
  }

  submit() {
    let attachedDocumentForm = this.initAttachedDocumentForm();
    Swal.fire({
      title: 'Đang thêm mới...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (attachedDocumentForm != null) {
          this.attachedDocumentService.create(attachedDocumentForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Tài liệu đã được thêm!',
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
    document.getElementById('attached-document-create-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
