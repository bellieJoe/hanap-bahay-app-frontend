import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpPage } from './cp.page';

const routes: Routes = [
  {
    path: '',
    component: CpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpPageRoutingModule {}
