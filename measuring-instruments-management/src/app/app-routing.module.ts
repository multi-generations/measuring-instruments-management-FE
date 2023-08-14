import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: "instruments", loadChildren: () =>
      import('./module/feature/instrument/instrument.module').then(module => module.InstrumentModule)
  },
  {
    path: "login", loadChildren: () =>
      import('./module/feature/login/login.module').then(module => module.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
