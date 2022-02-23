import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'imgvw',
    loadChildren: () => import('./imgvw/imgvw.module').then( m => m.ImgvwPageModule)
  },
  {
    path: 'imgupld',
    loadChildren: () => import('./imgupld/imgupld.module').then( m => m.ImgupldPageModule)
  },
  {
    path: 'img-edit',
    loadChildren: () => import('./img-edit/img-edit.module').then( m => m.ImgEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
