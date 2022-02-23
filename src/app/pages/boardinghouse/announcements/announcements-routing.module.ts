import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementsPage } from './announcements.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsPage
  },
  {
    path: 'createannouncement',
    loadChildren: () => import('./createannouncement/createannouncement.module').then( m => m.CreateannouncementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementsPageRoutingModule {}
