import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstrumentListComponent} from "./component/instrument-list/instrument-list.component";
import {authGuard} from "../../../auth.guard";
import {roleGuard} from "../../../role.guard";

const routes: Routes = [
  {
    path: "", component: InstrumentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentRoutingModule {
}
