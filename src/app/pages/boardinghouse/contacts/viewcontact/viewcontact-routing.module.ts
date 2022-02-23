import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcontactPage } from './viewcontact.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcontactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcontactPageRoutingModule {}
