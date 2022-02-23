import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgvwPageRoutingModule } from './imgvw-routing.module';

import { ImgvwPage } from './imgvw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgvwPageRoutingModule
  ],
  declarations: [ImgvwPage]
})
export class ImgvwPageModule {}
