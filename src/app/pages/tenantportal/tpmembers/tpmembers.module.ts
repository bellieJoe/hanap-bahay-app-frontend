import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TpmembersPageRoutingModule } from './tpmembers-routing.module';

import { TpmembersPage } from './tpmembers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TpmembersPageRoutingModule
  ],
  declarations: [TpmembersPage]
})
export class TpmembersPageModule {}
