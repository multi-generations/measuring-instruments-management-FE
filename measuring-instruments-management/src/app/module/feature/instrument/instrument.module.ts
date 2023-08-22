import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentListComponent } from './component/instrument-list/instrument-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { InstrumentSearchComponent } from './component/instrument-search/instrument-search.component';
import { InstrumentDetailComponent } from './component/instrument-detail/instrument-detail.component';


@NgModule({
  declarations: [
    InstrumentListComponent,
    InstrumentSearchComponent,
    InstrumentDetailComponent
  ],
    imports: [
        CommonModule,
        InstrumentRoutingModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class InstrumentModule { }
