import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenantannouncementPageRoutingModule } from './tenantannouncement-routing.module';

import { TenantannouncementPage } from './tenantannouncement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenantannouncementPageRoutingModule
  ],
  declarations: [TenantannouncementPage]
})
export class TenantannouncementPageModule {}
