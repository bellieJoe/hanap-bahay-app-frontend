import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovresformPage } from './approvresform.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovresformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovresformPageRoutingModule {}
