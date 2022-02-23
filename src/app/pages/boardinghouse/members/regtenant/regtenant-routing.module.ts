import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegtenantPage } from './regtenant.page';

const routes: Routes = [
  {
    path: '',
    component: RegtenantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegtenantPageRoutingModule {}
