import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribePageRoutingModule } from './subscribe-routing.module';

import { SubscribePage } from './subscribe.page';
import { ValidatorModule } from 'src/app/modules/validator/validator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscribePageRoutingModule,
    ValidatorModule
  ],
  declarations: [SubscribePage]
})
export class SubscribePageModule {}
