import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmindashboardPage } from './admindashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdmindashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmindashboardPageRoutingModule {}
