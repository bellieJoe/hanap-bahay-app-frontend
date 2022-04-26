import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRRPTypePage } from './add-rrptype.page';

const routes: Routes = [
  {
    path: '',
    component: AddRRPTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRRPTypePageRoutingModule {}
