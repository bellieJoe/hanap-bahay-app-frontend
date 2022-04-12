import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RrpTypeDetailsPage } from './rrp-type-details.page';

const routes: Routes = [
  {
    path: '',
    component: RrpTypeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RrpTypeDetailsPageRoutingModule {}
