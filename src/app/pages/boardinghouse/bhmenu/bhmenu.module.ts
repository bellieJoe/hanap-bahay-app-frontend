import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhmenuPageRoutingModule } from './bhmenu-routing.module';

import { BhmenuPage } from './bhmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhmenuPageRoutingModule
  ],
  declarations: [BhmenuPage]
})
export class BhmenuPageModule {}
