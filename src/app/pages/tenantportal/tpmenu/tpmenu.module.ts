import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TpmenuPageRoutingModule } from './tpmenu-routing.module';

import { TpmenuPage } from './tpmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TpmenuPageRoutingModule
  ],
  declarations: [TpmenuPage]
})
export class TpmenuPageModule {}
