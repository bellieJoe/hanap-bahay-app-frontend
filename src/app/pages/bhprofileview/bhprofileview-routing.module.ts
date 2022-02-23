import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BhprofileviewPage } from './bhprofileview.page';

const routes: Routes = [
  {
    path: '',
    component: BhprofileviewPage
  },
  {
    path: 'imgvw',
    loadChildren: () => import('./imgvw/imgvw.module').then( m => m.ImgvwPageModule)
  },
  {
    path: 'imgview',
    loadChildren: () => import('./imgview/imgview.module').then( m => m.ImgviewPageModule)
  },
  {
    // path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    // path: 'bhreserve',
    loadChildren: () => import('./bhreserve/bhreserve.module').then( m => m.BhreservePageModule)
  },
  {
    // path: 'rvw',
    loadChildren: () => import('./rvw/rvw.module').then( m => m.RvwPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BhprofileviewPageRoutingModule {}
