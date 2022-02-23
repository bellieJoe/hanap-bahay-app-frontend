import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateannouncementPage } from './createannouncement.page';

const routes: Routes = [
  {
    path: '',
    component: CreateannouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateannouncementPageRoutingModule {}
