import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttachedDocumentService} from "../../service/attached-document.service";
import {ConstantsService} from "../../../../shared/service/constants.service";
import {AttachedDocumentForm} from "../../model/form/AttachedDocumentForm";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-attached-document-update',
  templateUrl: './attached-document-update.component.html',
  styleUrls: ['./attached-document-update.component.css']
})
export class AttachedDocumentUpdateComponent implements OnChanges{
  @Input()
  attachedDocumentId: number = 0
  @Input()
  measuringInstrumentId: number = 0;

  @Output()
  emitResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  mainForm: FormGroup = this.createForm();
  resultChange: boolean = false;

  constructor(private attachedDocumentService: AttachedDocumentService,
              private _constantsService: ConstantsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attachedDocumentId']) {
      this.updateForm();
    }
  }

  createForm() {
    return new FormGroup({
      documentName: new FormControl('', [Validators.required]),
      documentSymbol: new FormControl('', []),
      quantity: new FormControl('', []),
      documentNote: new FormControl('')
    })
  }

  updateForm() {
    if (this.attachedDocumentId != 0) {
      this.attachedDocumentService.findDtoById(this.attachedDocumentId).subscribe(next => {
        this.mainForm.get('documentName')?.setValue(next.documentName);
        this.mainForm.get('documentSymbol')?.setValue(next.documentSymbol);
        this.mainForm.get('quantity')?.setValue(next.quantity);
        this.mainForm.get('documentNote')?.setValue(next.documentNote);
      })
    }
  }

  resetForm() {
    this.mainForm = this.createForm();
    this.updateForm();
  }

  initAttachedDocumentForm(): AttachedDocumentForm | null {
    if (this.measuringInstrumentId != 0 && this.mainForm.valid) {
      return {
        id: this.attachedDocumentId,
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
      title: 'Đang cập nhật...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (attachedDocumentForm != null) {
          this.attachedDocumentService.create(attachedDocumentForm).subscribe(next => {
            Swal.fire({
              position: 'center',
              title: 'Thành công!',
              text: 'Tài liệu đã được cập nhật!',
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
    this.resetForm();
  }

  closeModalBtnClick() {
    document.getElementById('attached-document-update-modal-close-btn')?.click();
  }

  // Getter
  get constantsService(): ConstantsService {
    return this._constantsService;
  }
}
