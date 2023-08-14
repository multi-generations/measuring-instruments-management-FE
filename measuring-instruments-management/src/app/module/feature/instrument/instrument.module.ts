import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentListComponent } from './component/instrument-list/instrument-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InstrumentListComponent
  ],
  imports: [
    CommonModule,
    InstrumentRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class InstrumentModule { }
