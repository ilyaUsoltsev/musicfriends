import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RepbaseDetailPage } from './repbase-detail.page';
import { SharedMapModule } from '../../shared/sharedmap.module';
import { UpdateRepbaseComponent } from '../update-repbase/update-repbase.component';
import { SharedModule } from '../../shared/sharedmodule.module';

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
    SharedModule,
    SharedMapModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RepbaseDetailPage],
  entryComponents: [UpdateRepbaseComponent]
})
export class RepbaseDetailPageModule {}
