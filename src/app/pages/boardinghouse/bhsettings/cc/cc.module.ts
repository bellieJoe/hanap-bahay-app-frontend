import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CcPageRoutingModule } from './cc-routing.module';

import { CcPage } from './cc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CcPageRoutingModule
  ],
  declarations: [CcPage]
})
export class CcPageModule {}
