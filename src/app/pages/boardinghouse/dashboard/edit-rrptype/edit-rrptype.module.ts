import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRrptypePageRoutingModule } from './edit-rrptype-routing.module';

import { EditRrptypePage } from './edit-rrptype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRrptypePageRoutingModule
  ],
  declarations: [EditRrptypePage]
})
export class EditRrptypePageModule {}
