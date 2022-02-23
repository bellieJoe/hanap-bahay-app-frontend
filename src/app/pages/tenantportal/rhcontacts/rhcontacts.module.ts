import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RhcontactsPageRoutingModule } from './rhcontacts-routing.module';

import { RhcontactsPage } from './rhcontacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RhcontactsPageRoutingModule
  ],
  declarations: [RhcontactsPage]
})
export class RhcontactsPageModule {}
