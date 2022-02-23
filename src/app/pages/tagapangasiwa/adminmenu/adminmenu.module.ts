import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminmenuPageRoutingModule } from './adminmenu-routing.module';

import { AdminmenuPage } from './adminmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminmenuPageRoutingModule
  ],
  declarations: [AdminmenuPage]
})
export class AdminmenuPageModule {}
