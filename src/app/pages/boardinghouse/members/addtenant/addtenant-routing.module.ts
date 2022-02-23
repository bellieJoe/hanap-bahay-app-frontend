import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtenantPage } from './addtenant.page';

const routes: Routes = [
  {
    path: '',
    component: AddtenantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtenantPageRoutingModule {}
