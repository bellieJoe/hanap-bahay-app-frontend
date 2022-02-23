import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupdonePage } from './signupdone.page';

const routes: Routes = [
  {
    path: '',
    component: SignupdonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupdonePageRoutingModule {}
