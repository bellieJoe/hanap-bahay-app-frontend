import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BhsettingsPage } from './bhsettings.page';

const routes: Routes = [
  {
    path: '',
    component: BhsettingsPage
  },
  {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'cc',
    loadChildren: () => import('./cc/cc.module').then( m => m.CcPageModule)
  },
  {
    path: 'editdets',
    loadChildren: () => import('./editdets/editdets.module').then( m => m.EditdetsPageModule)
  },
  {
    path: 'resexp',
    loadChildren: () => import('./resexp/resexp.module').then( m => m.ResexpPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BhsettingsPageRoutingModule {}
