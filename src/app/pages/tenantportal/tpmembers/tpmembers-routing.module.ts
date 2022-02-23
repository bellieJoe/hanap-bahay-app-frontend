import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TpmembersPage } from './tpmembers.page';

const routes: Routes = [
  {
    path: '',
    component: TpmembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TpmembersPageRoutingModule {}
