import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprofPageRoutingModule } from './editprof-routing.module';

import { EditprofPage } from './editprof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofPageRoutingModule
  ],
  declarations: [EditprofPage]
})
export class EditprofPageModule {}
