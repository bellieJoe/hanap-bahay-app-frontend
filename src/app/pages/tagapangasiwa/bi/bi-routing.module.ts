import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiPage } from './bi.page';

const routes: Routes = [
  {
    path: '',
    component: BiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiPageRoutingModule {}
