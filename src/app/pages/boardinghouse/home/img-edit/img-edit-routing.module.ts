import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgEditPage } from './img-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ImgEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgEditPageRoutingModule {}
