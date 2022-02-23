import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BhreservationsPage } from './bhreservations.page';

const routes: Routes = [
  {
    path: '',
    component: BhreservationsPage
  },
  {
    path: 'approvresform',
    loadChildren: () => import('./approvresform/approvresform.module').then( m => m.ApprovresformPageModule)
  },
  {
    path: 'editform',
    loadChildren: () => import('./editform/editform.module').then( m => m.EditformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BhreservationsPageRoutingModule {}
