import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuPageRoutingModule } from './cu-routing.module';

import { CuPage } from './cu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuPageRoutingModule
  ],
  declarations: [CuPage]
})
export class CuPageModule {}
