import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditformPage } from './editform.page';

const routes: Routes = [
  {
    path: '',
    component: EditformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditformPageRoutingModule {}
