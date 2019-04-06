import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddRepbasePage } from './add-repbase.page';
import { SharedMapModule } from '../../shared/sharedmap.module';

const routes: Routes = [
  {
    path: '',
    component: AddRepbasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedMapModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddRepbasePage]
})
export class AddRepbasePageModule {}
