import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResviewPageRoutingModule } from './resview-routing.module';

import { ResviewPage } from './resview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResviewPageRoutingModule
  ],
  declarations: [ResviewPage]
})
export class ResviewPageModule {}
