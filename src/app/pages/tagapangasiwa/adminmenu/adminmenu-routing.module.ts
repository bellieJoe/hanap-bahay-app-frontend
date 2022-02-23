import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminmenuPage } from './adminmenu.page';

const routes: Routes = [
  {
    path: '',
    component: AdminmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminmenuPageRoutingModule {}
