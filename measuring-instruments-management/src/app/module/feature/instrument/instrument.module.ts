import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentListComponent } from './component/instrument-list/instrument-list.component';


@NgModule({
  declarations: [
    InstrumentListComponent
  ],
  imports: [
    CommonModule,
    InstrumentRoutingModule
  ]
})
export class InstrumentModule { }
