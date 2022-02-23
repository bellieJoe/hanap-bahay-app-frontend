import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditprofPage } from './editprof.page';

const routes: Routes = [
  {
    path: '',
    component: EditprofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditprofPageRoutingModule {}
