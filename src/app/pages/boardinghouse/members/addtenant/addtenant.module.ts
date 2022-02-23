import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtenantPageRoutingModule } from './addtenant-routing.module';

import { AddtenantPage } from './addtenant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtenantPageRoutingModule
  ],
  declarations: [AddtenantPage]
})
export class AddtenantPageModule {}
