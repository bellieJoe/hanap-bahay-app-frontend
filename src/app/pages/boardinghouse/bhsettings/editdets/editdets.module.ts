import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdetsPageRoutingModule } from './editdets-routing.module';

import { EditdetsPage } from './editdets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdetsPageRoutingModule
  ],
  declarations: [EditdetsPage]
})
export class EditdetsPageModule {}
