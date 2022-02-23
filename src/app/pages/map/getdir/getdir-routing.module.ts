import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetdirPage } from './getdir.page';

const routes: Routes = [
  {
    path: '',
    component: GetdirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetdirPageRoutingModule {}
