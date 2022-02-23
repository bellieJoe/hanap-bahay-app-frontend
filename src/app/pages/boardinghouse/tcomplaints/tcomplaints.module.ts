import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TcomplaintsPageRoutingModule } from './tcomplaints-routing.module';

import { TcomplaintsPage } from './tcomplaints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TcomplaintsPageRoutingModule
  ],
  declarations: [TcomplaintsPage]
})
export class TcomplaintsPageModule {}
