import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegtenantPageRoutingModule } from './regtenant-routing.module';

import { RegtenantPage } from './regtenant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegtenantPageRoutingModule
  ],
  declarations: [RegtenantPage]
})
export class RegtenantPageModule {}
