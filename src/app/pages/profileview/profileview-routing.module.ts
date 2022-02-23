import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileviewPage } from './profileview.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileviewPageRoutingModule {}
