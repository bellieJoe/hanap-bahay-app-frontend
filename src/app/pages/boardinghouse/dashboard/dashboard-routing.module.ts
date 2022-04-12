import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'add-rrptype',
    loadChildren: () => import('./add-rrptype/add-rrptype.module').then( m => m.AddRRPTypePageModule)
  },  {
    path: 'rrp-type-details',
    loadChildren: () => import('./rrp-type-details/rrp-type-details.module').then( m => m.RrpTypeDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
