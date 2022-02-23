import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgupldPageRoutingModule } from './imgupld-routing.module';

import { ImgupldPage } from './imgupld.page';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgupldPageRoutingModule,
  ],
  declarations: [
    ImgupldPage,
    ImageCropperComponent
  ]
})
export class ImgupldPageModule {}
