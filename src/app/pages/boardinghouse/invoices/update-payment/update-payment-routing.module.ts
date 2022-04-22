import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePaymentPage } from './update-payment.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePaymentPageRoutingModule {}
