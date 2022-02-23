import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RhprofilePageRoutingModule } from './rhprofile-routing.module';

import { RhprofilePage } from './rhprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RhprofilePageRoutingModule
  ],
  declarations: [RhprofilePage]
})
export class RhprofilePageModule {}
