import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhreservePageRoutingModule } from './bhreserve-routing.module';

import { BhreservePage } from './bhreserve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhreservePageRoutingModule
  ],
  declarations: [BhreservePage]
})
export class BhreservePageModule {}
