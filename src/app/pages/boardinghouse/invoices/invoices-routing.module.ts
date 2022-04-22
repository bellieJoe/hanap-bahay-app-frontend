import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesPage } from './invoices.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicesPage
  },
  {
    path: 'update-payment',
    loadChildren: () => import('./update-payment/update-payment.module').then( m => m.UpdatePaymentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesPageRoutingModule {}
