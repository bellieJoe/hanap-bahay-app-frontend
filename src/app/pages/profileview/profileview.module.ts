import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileviewPageRoutingModule } from './profileview-routing.module';

import { ProfileviewPage } from './profileview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileviewPageRoutingModule
  ],
  declarations: [ProfileviewPage]
})
export class ProfileviewPageModule {}
