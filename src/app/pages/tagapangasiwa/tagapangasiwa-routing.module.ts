import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagapangasiwaPage } from './tagapangasiwa.page';

const routes: Routes = [
  {
    path: '',
    component: TagapangasiwaPage
  },
  {
    path: 'adminmenu',
    loadChildren: () => import('./adminmenu/adminmenu.module').then( m => m.AdminmenuPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'cu',
    loadChildren: () => import('./cu/cu.module').then( m => m.CuPageModule)
  },
  {
    path: 'cp',
    loadChildren: () => import('./cp/cp.module').then( m => m.CpPageModule)
  },
  {
    path: 'bi',
    loadChildren: () => import('./bi/bi.module').then( m => m.BiPageModule)
  },
  {
    path: 'add-a',
    loadChildren: () => import('./add-a/add-a.module').then( m => m.AddAPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagapangasiwaPageRoutingModule {}
