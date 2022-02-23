import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BhmenuPage } from './bhmenu.page';

const routes: Routes = [
  {
    path: '',
    component: BhmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BhmenuPageRoutingModule {}
