import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankPage } from './blank.page';

const routes: Routes = [
  {
    path: '',
    component: BlankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlankPageRoutingModule {}
