import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdetsPage } from './editdets.page';

const routes: Routes = [
  {
    path: '',
    component: EditdetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdetsPageRoutingModule {}
