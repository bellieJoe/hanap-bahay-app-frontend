import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiPageRoutingModule } from './bi-routing.module';

import { BiPage } from './bi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiPageRoutingModule
  ],
  declarations: [BiPage]
})
export class BiPageModule {}
