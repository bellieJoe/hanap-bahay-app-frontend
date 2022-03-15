import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgupldPageRoutingModule } from './imgupld-routing.module';

import { ImgupldPage } from './imgupld.page';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgupldPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [
    ImgupldPage,
    // ImageCropperComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImgupldPageModule {}
