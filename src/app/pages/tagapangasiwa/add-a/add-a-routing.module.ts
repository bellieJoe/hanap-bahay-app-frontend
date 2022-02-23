import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAPage } from './add-a.page';

const routes: Routes = [
  {
    path: '',
    component: AddAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAPageRoutingModule {}
