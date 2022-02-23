import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResexpPage } from './resexp.page';

const routes: Routes = [
  {
    path: '',
    component: ResexpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResexpPageRoutingModule {}
