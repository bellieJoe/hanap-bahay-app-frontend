import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgvwPage } from './imgvw.page';

const routes: Routes = [
  {
    path: '',
    component: ImgvwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgvwPageRoutingModule {}
