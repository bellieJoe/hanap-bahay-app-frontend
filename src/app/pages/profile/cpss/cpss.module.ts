import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpssPageRoutingModule } from './cpss-routing.module';

import { CpssPage } from './cpss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpssPageRoutingModule
  ],
  declarations: [CpssPage]
})
export class CpssPageModule {}
