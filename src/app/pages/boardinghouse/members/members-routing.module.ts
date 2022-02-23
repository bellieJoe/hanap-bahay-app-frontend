import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage
  },
  {
    path: 'editroomname',
    loadChildren: () => import('./editroomname/editroomname.module').then( m => m.EditroomnamePageModule)
  },
  {
    path: 'addroom',
    loadChildren: () => import('./addroom/addroom.module').then( m => m.AddroomPageModule)
  },
  {
    path: 'addtenant',
    loadChildren: () => import('./addtenant/addtenant.module').then( m => m.AddtenantPageModule)
  },
  {
    path: 'regtenant',
    loadChildren: () => import('./regtenant/regtenant.module').then( m => m.RegtenantPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersPageRoutingModule {}
