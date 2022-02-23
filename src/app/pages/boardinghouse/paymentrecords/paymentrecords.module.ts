import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentrecordsPageRoutingModule } from './paymentrecords-routing.module';

import { PaymentrecordsPage } from './paymentrecords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentrecordsPageRoutingModule
  ],
  declarations: [PaymentrecordsPage]
})
export class PaymentrecordsPageModule {}
