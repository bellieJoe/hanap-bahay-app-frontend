import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RrpTypeDetailsPageRoutingModule } from './rrp-type-details-routing.module';

import { RrpTypeDetailsPage } from './rrp-type-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RrpTypeDetailsPageRoutingModule
  ],
  declarations: [RrpTypeDetailsPage]
})
export class RrpTypeDetailsPageModule {}
