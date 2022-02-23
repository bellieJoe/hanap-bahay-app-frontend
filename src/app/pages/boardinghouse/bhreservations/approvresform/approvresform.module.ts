import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovresformPageRoutingModule } from './approvresform-routing.module';

import { ApprovresformPage } from './approvresform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovresformPageRoutingModule
  ],
  declarations: [ApprovresformPage]
})
export class ApprovresformPageModule {}
