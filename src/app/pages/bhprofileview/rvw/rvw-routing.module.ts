import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RvwPage } from './rvw.page';

const routes: Routes = [
  {
    path: '',
    component: RvwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RvwPageRoutingModule {}
