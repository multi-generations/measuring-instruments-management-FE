import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InstrumentListComponent} from "./component/instrument-list/instrument-list.component";
import {InstrumentDetailComponent} from "./component/instrument-detail/instrument-detail.component";
import {InstrumentCreateComponent} from "./component/instrument-create/instrument-create.component";
import {InstrumentUpdateComponent} from "./component/instrument-update/instrument-update.component";

const routes: Routes = [
  {path: "", component: InstrumentListComponent},
  {path: "create", component: InstrumentCreateComponent},
  {path: "update/:id", component: InstrumentUpdateComponent},
  {path: ":id", component: InstrumentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentRoutingModule {
}
