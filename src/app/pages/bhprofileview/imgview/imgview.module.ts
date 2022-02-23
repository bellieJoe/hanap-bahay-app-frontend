import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgviewPageRoutingModule } from './imgview-routing.module';

import { ImgviewPage } from './imgview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgviewPageRoutingModule
  ],
  declarations: [ImgviewPage]
})
export class ImgviewPageModule {}
