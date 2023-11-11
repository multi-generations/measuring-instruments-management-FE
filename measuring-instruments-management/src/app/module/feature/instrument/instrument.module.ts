import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {InstrumentRoutingModule} from './instrument-routing.module';
import {InstrumentListComponent} from './component/instrument-list/instrument-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {InstrumentSearchComponent} from './component/instrument-search/instrument-search.component';
import {InstrumentDetailComponent} from './component/instrument-detail/instrument-detail.component';
import { InstrumentCreateComponent } from './component/instrument-create/instrument-create.component';
import { InstrumentUpdateComponent } from './component/instrument-update/instrument-update.component';
import { TechnicalCharacteristicCreateComponent } from './component/technical-characteristic-create/technical-characteristic-create.component';
import { TechnicalCharacteristicUpdateComponent } from './component/technical-characteristic-update/technical-characteristic-update.component';
import { AttachedDocumentCreateComponent } from './component/attached-document-create/attached-document-create.component';
import { AttachedDocumentUpdateComponent } from './component/attached-document-update/attached-document-update.component';


@NgModule({
  declarations: [
    InstrumentListComponent,
    InstrumentSearchComponent,
    InstrumentDetailComponent,
    InstrumentCreateComponent,
    InstrumentUpdateComponent,
    TechnicalCharacteristicCreateComponent,
    TechnicalCharacteristicUpdateComponent,
    AttachedDocumentCreateComponent,
    AttachedDocumentUpdateComponent
  ],
  imports: [
    CommonModule,
    InstrumentRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class InstrumentModule {
}
