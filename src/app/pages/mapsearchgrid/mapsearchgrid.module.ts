import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsearchgridPageRoutingModule } from './mapsearchgrid-routing.module';

import { MapsearchgridPage } from './mapsearchgrid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsearchgridPageRoutingModule
  ],
  declarations: [MapsearchgridPage]
})
export class MapsearchgridPageModule {}
