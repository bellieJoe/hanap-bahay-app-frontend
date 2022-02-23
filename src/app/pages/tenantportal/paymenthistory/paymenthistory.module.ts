import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymenthistoryPageRoutingModule } from './paymenthistory-routing.module';

import { PaymenthistoryPage } from './paymenthistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymenthistoryPageRoutingModule
  ],
  declarations: [PaymenthistoryPage]
})
export class PaymenthistoryPageModule {}
