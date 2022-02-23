import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpssPage } from './cpss.page';

const routes: Routes = [
  {
    path: '',
    component: CpssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpssPageRoutingModule {}
