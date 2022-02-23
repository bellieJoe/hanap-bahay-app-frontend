import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResviewPage } from './resview.page';

const routes: Routes = [
  {
    path: '',
    component: ResviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResviewPageRoutingModule {}
