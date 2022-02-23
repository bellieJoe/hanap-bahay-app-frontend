import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditformPageRoutingModule } from './editform-routing.module';

import { EditformPage } from './editform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditformPageRoutingModule
  ],
  declarations: [EditformPage]
})
export class EditformPageModule {}
