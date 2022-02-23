import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationPage } from './reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationPage
  },
  {
    path: 'resview',
    loadChildren: () => import('./resview/resview.module').then( m => m.ResviewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationPageRoutingModule {}
