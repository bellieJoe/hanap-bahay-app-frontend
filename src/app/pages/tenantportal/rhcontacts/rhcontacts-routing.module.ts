import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RhcontactsPage } from './rhcontacts.page';

const routes: Routes = [
  {
    path: '',
    component: RhcontactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RhcontactsPageRoutingModule {}
