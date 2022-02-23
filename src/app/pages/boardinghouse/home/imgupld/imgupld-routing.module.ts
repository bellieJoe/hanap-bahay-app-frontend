import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgupldPage } from './imgupld.page';

const routes: Routes = [
  {
    path: '',
    component: ImgupldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgupldPageRoutingModule {}
