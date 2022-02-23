import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResexpPageRoutingModule } from './resexp-routing.module';

import { ResexpPage } from './resexp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResexpPageRoutingModule
  ],
  declarations: [ResexpPage]
})
export class ResexpPageModule {}
