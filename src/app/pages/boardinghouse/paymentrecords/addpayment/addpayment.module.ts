import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpaymentPageRoutingModule } from './addpayment-routing.module';

import { AddpaymentPage } from './addpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpaymentPageRoutingModule
  ],
  declarations: [AddpaymentPage]
})
export class AddpaymentPageModule {}
