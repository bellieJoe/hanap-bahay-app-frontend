import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BhreservePage } from './bhreserve.page';

const routes: Routes = [
  {
    path: '',
    component: BhreservePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BhreservePageRoutingModule {}
