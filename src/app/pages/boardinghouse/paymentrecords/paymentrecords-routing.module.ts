import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentrecordsPage } from './paymentrecords.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentrecordsPage
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'addpayment',
    loadChildren: () => import('./addpayment/addpayment.module').then( m => m.AddpaymentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentrecordsPageRoutingModule {}
