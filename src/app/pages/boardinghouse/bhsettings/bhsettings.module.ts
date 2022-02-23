import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BhsettingsPageRoutingModule } from './bhsettings-routing.module';

import { BhsettingsPage } from './bhsettings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BhsettingsPageRoutingModule
  ],
  declarations: [BhsettingsPage]
})
export class BhsettingsPageModule {}
