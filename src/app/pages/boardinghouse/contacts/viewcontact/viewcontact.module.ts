import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewcontactPageRoutingModule } from './viewcontact-routing.module';

import { ViewcontactPage } from './viewcontact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewcontactPageRoutingModule
  ],
  declarations: [ViewcontactPage]
})
export class ViewcontactPageModule {}
