import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpaymentPage } from './addpayment.page';

const routes: Routes = [
  {
    path: '',
    component: AddpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpaymentPageRoutingModule {}
