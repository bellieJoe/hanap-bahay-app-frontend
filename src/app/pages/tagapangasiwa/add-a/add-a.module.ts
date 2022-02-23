import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAPageRoutingModule } from './add-a-routing.module';

import { AddAPage } from './add-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAPageRoutingModule
  ],
  declarations: [AddAPage]
})
export class AddAPageModule {}
