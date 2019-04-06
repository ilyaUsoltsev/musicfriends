import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PostDetailPage } from './post-detail.page';
import { AddPostPage } from '../../add-post/add-post.page';
import { SharedModule } from '../../shared/sharedmodule.module';

const routes: Routes = [
  {
    path: '',
    component: PostDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostDetailPage],
  entryComponents: [AddPostPage]
})
export class PostDetailPageModule {}
