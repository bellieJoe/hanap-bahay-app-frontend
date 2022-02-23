import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditroomnamePageRoutingModule } from './editroomname-routing.module';

import { EditroomnamePage } from './editroomname.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditroomnamePageRoutingModule
  ],
  declarations: [EditroomnamePage]
})
export class EditroomnamePageModule {}
