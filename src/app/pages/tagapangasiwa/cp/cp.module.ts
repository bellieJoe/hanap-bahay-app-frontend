import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpPageRoutingModule } from './cp-routing.module';

import { CpPage } from './cp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpPageRoutingModule
  ],
  declarations: [CpPage]
})
export class CpPageModule {}
