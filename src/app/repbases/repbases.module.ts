import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RepbasesPage } from './repbases.page';
import { SharedMapModule } from '../shared/sharedmap.module';

const routes: Routes = [
  {
    path: '',
    component: RepbasesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedMapModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RepbasesPage]
})
export class RepbasesPageModule {}
