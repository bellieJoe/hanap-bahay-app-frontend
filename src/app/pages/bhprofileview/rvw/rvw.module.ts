import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RvwPageRoutingModule } from './rvw-routing.module';

import { RvwPage } from './rvw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RvwPageRoutingModule
  ],
  declarations: [RvwPage]
})
export class RvwPageModule {}
