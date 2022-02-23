import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhprofileviewPageRoutingModule } from './bhprofileview-routing.module';

import { BhprofileviewPage } from './bhprofileview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhprofileviewPageRoutingModule
  ],
  declarations: [BhprofileviewPage]
})
export class BhprofileviewPageModule {}
