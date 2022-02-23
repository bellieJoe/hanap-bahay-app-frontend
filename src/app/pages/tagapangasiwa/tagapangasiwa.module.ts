import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagapangasiwaPageRoutingModule } from './tagapangasiwa-routing.module';

import { TagapangasiwaPage } from './tagapangasiwa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagapangasiwaPageRoutingModule
  ],
  declarations: [TagapangasiwaPage]
})
export class TagapangasiwaPageModule {}
