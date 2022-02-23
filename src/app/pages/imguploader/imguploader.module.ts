import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImguploaderPageRoutingModule } from './imguploader-routing.module';

import { ImguploaderPage } from './imguploader.page';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImguploaderPageRoutingModule,
  ],
  declarations: [
    ImguploaderPage,
    ImageCropperComponent
    // ImageCropperComponent
  ]
})
export class ImguploaderPageModule {}
