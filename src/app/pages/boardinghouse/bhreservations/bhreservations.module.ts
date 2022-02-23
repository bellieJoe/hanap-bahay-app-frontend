import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhreservationsPageRoutingModule } from './bhreservations-routing.module';

import { BhreservationsPage } from './bhreservations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhreservationsPageRoutingModule
  ],
  declarations: [BhreservationsPage]
})
export class BhreservationsPageModule {}
