import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingpage',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/landingpage/landingpage.module').then( m => m.LandingpagePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./pages/reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'checklist',
    loadChildren: () => import('./pages/checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./pages/subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'boardinghouse',
    loadChildren: () => import('./pages/boardinghouse/boardinghouse.module').then( m => m.BoardinghousePageModule)
  },
  {
    path: 'profileview',
    loadChildren: () => import('./pages/profileview/profileview.module').then( m => m.ProfileviewPageModule)
  },
  {
    path: 'bhprofileview',
    loadChildren: () => import('./pages/bhprofileview/bhprofileview.module').then( m => m.BhprofileviewPageModule)
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./pages/landingpage/landingpage.module').then( m => m.LandingpagePageModule)
  },
  {
    path: 'mapsearchgrid',
    loadChildren: () => import('./pages/mapsearchgrid/mapsearchgrid.module').then( m => m.MapsearchgridPageModule)
  },
  {
    path: 'tenantannouncement',
    loadChildren: () => import('./pages/tenantportal/tenantannouncement/tenantannouncement.module').then( m => m.TenantannouncementPageModule)
  },
  {
    path: 'tpmenu',
    loadChildren: () => import('./pages/tenantportal/tpmenu/tpmenu.module').then( m => m.TpmenuPageModule)
  },
  {
    path: 'paymenthistory',
    loadChildren: () => import('./pages/tenantportal/paymenthistory/paymenthistory.module').then( m => m.PaymenthistoryPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./pages/tenantportal/complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'rhprofile',
    loadChildren: () => import('./pages/tenantportal/rhprofile/rhprofile.module').then( m => m.RhprofilePageModule)
  },
  {
    path: 'rhcontacts',
    loadChildren: () => import('./pages/tenantportal/rhcontacts/rhcontacts.module').then( m => m.RhcontactsPageModule)
  },
  {
    path: 'tpmembers',
    loadChildren: () => import('./pages/tenantportal/tpmembers/tpmembers.module').then( m => m.TpmembersPageModule)
  },
  {
    path: 'blank',
    loadChildren: () => import('./pages/blank/blank.module').then( m => m.BlankPageModule)
  },
  {
    path: 'temp',
    loadChildren: () => import('./pages/tenantportal/temp/temp.module').then( m => m.TempPageModule)
  },
  {
    path: 'imguploader',
    loadChildren: () => import('./pages/imguploader/imguploader.module').then( m => m.ImguploaderPageModule)
  },
  {
    path: 'rvw',
    loadChildren: () => import('./pages/rvw/rvw.module').then( m => m.RvwPageModule)
  },
  {
    path: 'issues',
    loadChildren: () => import('./pages/issues/issues.module').then( m => m.IssuesPageModule)
  },
  {
    path: 'tagapangasiwa',
    loadChildren: () => import('./pages/tagapangasiwa/tagapangasiwa.module').then( m => m.TagapangasiwaPageModule)
  },  {
    path: 'invoice',
    loadChildren: () => import('./pages/invoice/invoice.module').then( m => m.InvoicePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
