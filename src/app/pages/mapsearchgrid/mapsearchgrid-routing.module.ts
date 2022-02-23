import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsearchgridPage } from './mapsearchgrid.page';

const routes: Routes = [
  {
    path: '',
    component: MapsearchgridPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsearchgridPageRoutingModule {}
