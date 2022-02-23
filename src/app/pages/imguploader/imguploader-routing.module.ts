import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImguploaderPage } from './imguploader.page';

const routes: Routes = [
  {
    path: '',
    component: ImguploaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImguploaderPageRoutingModule {}
