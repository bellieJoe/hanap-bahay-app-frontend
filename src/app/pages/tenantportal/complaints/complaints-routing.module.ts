import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintsPage } from './complaints.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintsPageRoutingModule {}
