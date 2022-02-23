import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantannouncementPage } from './tenantannouncement.page';

const routes: Routes = [
  {
    path: '',
    component: TenantannouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantannouncementPageRoutingModule {}
