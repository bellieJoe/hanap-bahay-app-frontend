import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsPage } from './contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsPage
  },
  {
    path: 'addcontact',
    loadChildren: () => import('./addcontact/addcontact.module').then( m => m.AddcontactPageModule)
  },
  {
    path: 'viewcontact',
    loadChildren: () => import('./viewcontact/viewcontact.module').then( m => m.ViewcontactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsPageRoutingModule {}
