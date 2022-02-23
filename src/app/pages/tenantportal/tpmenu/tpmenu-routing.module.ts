import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TpmenuPage } from './tpmenu.page';

const routes: Routes = [
  {
    path: '',
    component: TpmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TpmenuPageRoutingModule {}
