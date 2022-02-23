import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgviewPage } from './imgview.page';

const routes: Routes = [
  {
    path: '',
    component: ImgviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgviewPageRoutingModule {}
