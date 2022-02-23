import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddroomPageRoutingModule } from './addroom-routing.module';

import { AddroomPage } from './addroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddroomPageRoutingModule
  ],
  declarations: [AddroomPage]
})
export class AddroomPageModule {}
