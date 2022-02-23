import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuPage } from './cu.page';

const routes: Routes = [
  {
    path: '',
    component: CuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuPageRoutingModule {}
