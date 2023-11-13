import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentListComponent } from './component/instrument-list/instrument-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InstrumentSearchComponent } from './component/instrument-search/instrument-search.component';
import { InstrumentDetailComponent } from './component/instrument-detail/instrument-detail.component';
import { InstrumentCreateComponent } from './component/instrument-create/instrument-create.component';
import { InstrumentUpdateComponent } from './component/instrument-update/instrument-update.component';
import { TechnicalCharacteristicCreateComponent } from './component/technical-characteristic-create/technical-characteristic-create.component';
import { TechnicalCharacteristicUpdateComponent } from './component/technical-characteristic-update/technical-characteristic-update.component';
import { AttachedDocumentCreateComponent } from './component/attached-document-create/attached-document-create.component';
import { AttachedDocumentUpdateComponent } from './component/attached-document-update/attached-document-update.component';
import { InstrumentUsageCreateComponent } from './component/instrument-usage-create/instrument-usage-create.component';
import { InstrumentRepairCreateComponent } from './component/instrument-repair-create/instrument-repair-create.component';
import { InstrumentAccreditationCreateComponent } from './component/instrument-accreditation-create/instrument-accreditation-create.component';
import { InstrumentForwardCreateComponent } from './component/instrument-forward-create/instrument-forward-create.component';
import { InstrumentForwardUpdateComponent } from './component/instrument-forward-update/instrument-forward-update.component';
import { InstrumentAccreditationUpdateComponent } from './component/instrument-accreditation-update/instrument-accreditation-update.component';
import { InstrumentRepairUpdateComponent } from './component/instrument-repair-update/instrument-repair-update.component';
import { InstrumentUsageUpdateComponent } from './component/instrument-usage-update/instrument-usage-update.component';

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
    AttachedDocumentUpdateComponent,
    InstrumentUsageCreateComponent,
    InstrumentRepairCreateComponent,
    InstrumentAccreditationCreateComponent,
    InstrumentForwardCreateComponent,
    InstrumentForwardUpdateComponent,
    InstrumentAccreditationUpdateComponent,
    InstrumentRepairUpdateComponent,
    InstrumentUsageUpdateComponent,
  ],
  imports: [
    CommonModule,
    InstrumentRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
})
export class InstrumentModule {}
