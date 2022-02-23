import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgEditPageRoutingModule } from './img-edit-routing.module';

import { ImgEditPage } from './img-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgEditPageRoutingModule
  ],
  declarations: [ImgEditPage]
})
export class ImgEditPageModule {}
