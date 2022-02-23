import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CcPage } from './cc.page';

const routes: Routes = [
  {
    path: '',
    component: CcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CcPageRoutingModule {}
