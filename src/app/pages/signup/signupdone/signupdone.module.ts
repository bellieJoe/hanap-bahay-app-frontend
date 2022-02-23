import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupdonePageRoutingModule } from './signupdone-routing.module';

import { SignupdonePage } from './signupdone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupdonePageRoutingModule
  ],
  declarations: [SignupdonePage]
})
export class SignupdonePageModule {}
