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


@NgModule({
  declarations: [
    InstrumentListComponent,
    InstrumentSearchComponent,
    InstrumentDetailComponent,
    InstrumentCreateComponent
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
