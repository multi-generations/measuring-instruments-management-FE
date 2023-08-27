import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PaginationComponent } from './component/pagination/pagination.component';


@NgModule({
  declarations: [
    PaginationComponent
  ],
    exports: [
        PaginationComponent
    ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
