import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardinghousePage } from './boardinghouse.page';

const routes: Routes = [
  //{
  //   path: '',
  //   component: BoardinghousePage,
  //   children: [
  //     {
  //       path: 'contacts',
  //       loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  //     },
  //     {
  //       path: 'announcements',
  //       loadChildren: () => import('./announcements/announcements.module').then( m => m.AnnouncementsPageModule)
  //     },
  //     {
  //       path: 'members',
  //       loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
  //     },
  //     {
  //       path: 'home',
  //       loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  //     },
  //     {
  //       path: 'bhsettings',
  //       loadChildren: () => import('./bhsettings/bhsettings.module').then( m => m.BhsettingsPageModule)
  //     },
  //   ]
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./announcements/announcements.module').then( m => m.AnnouncementsPageModule)
  // },
  {
    path: '',
    redirectTo: 'members',
    pathMatch: 'full'
  },
  {
    path: 'bhmenu',
    loadChildren: () => import('./bhmenu/bhmenu.module').then( m => m.BhmenuPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'announcements',
    loadChildren: () => import('./announcements/announcements.module').then( m => m.AnnouncementsPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'bhsettings',
    loadChildren: () => import('./bhsettings/bhsettings.module').then( m => m.BhsettingsPageModule)
  },
  {
    path: 'bhreservations',
    loadChildren: () => import('./bhreservations/bhreservations.module').then( m => m.BhreservationsPageModule)
  },
  {
    path: 'paymentrecords',
    loadChildren: () => import('./paymentrecords/paymentrecords.module').then( m => m.PaymentrecordsPageModule)
  },
  {
    path: 'tcomplaints',
    loadChildren: () => import('./tcomplaints/tcomplaints.module').then( m => m.TcomplaintsPageModule)
  },
  {
    path: 'bhmsg',
    loadChildren: () => import('./bhmsg/bhmsg.module').then( m => m.BhmsgPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardinghousePageRoutingModule {}
