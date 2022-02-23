import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardinghousePageRoutingModule } from './boardinghouse-routing.module';

import { BoardinghousePage } from './boardinghouse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardinghousePageRoutingModule,

  ],
  declarations: [BoardinghousePage]
})
export class BoardinghousePageModule {}
