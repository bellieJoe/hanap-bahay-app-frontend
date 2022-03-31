import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRRPTypePageRoutingModule } from './add-rrptype-routing.module';

import { AddRRPTypePage } from './add-rrptype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRRPTypePageRoutingModule
  ],
  declarations: [AddRRPTypePage]
})
export class AddRRPTypePageModule {}
