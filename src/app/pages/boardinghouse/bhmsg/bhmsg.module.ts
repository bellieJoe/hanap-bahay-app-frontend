import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhmsgPageRoutingModule } from './bhmsg-routing.module';

import { BhmsgPage } from './bhmsg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhmsgPageRoutingModule
  ],
  declarations: [BhmsgPage]
})
export class BhmsgPageModule {}
