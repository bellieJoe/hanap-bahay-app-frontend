import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymenthistoryPage } from './paymenthistory.page';

const routes: Routes = [
  {
    path: '',
    component: PaymenthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymenthistoryPageRoutingModule {}
