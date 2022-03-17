import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgupldPageRoutingModule } from './imgupld-routing.module';

import { ImgupldPage } from './imgupld.page';

import { ImageCropperModule } from 'ngx-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgupldPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [
    ImgupldPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImgupldPageModule {}
