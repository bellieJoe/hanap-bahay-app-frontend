import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetdirPageRoutingModule } from './getdir-routing.module';

import { GetdirPage } from './getdir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetdirPageRoutingModule
  ],
  declarations: [GetdirPage]
})
export class GetdirPageModule {}
