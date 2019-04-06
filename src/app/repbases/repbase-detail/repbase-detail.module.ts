import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RepbaseDetailPage } from './repbase-detail.page';
import { SharedMapModule } from '../../shared/sharedmap.module';

const routes: Routes = [
  {
    path: '',
    component: RepbaseDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedMapModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RepbaseDetailPage]
})
export class RepbaseDetailPageModule {}
