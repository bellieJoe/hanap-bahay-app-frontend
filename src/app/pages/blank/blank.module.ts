import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlankPageRoutingModule } from './blank-routing.module';

import { BlankPage } from './blank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlankPageRoutingModule
  ],
  declarations: [BlankPage]
})
export class BlankPageModule {}
