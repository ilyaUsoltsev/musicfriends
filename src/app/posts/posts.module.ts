import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PostsPage } from './posts.page';
import { AddPostPage } from '../add-post/add-post.page';
import { SharedModule } from '../shared/sharedmodule.module';
const routes: Routes = [
  {
    path: '',
    component: PostsPage
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
  declarations: [PostsPage],
  entryComponents: [AddPostPage]
})
export class PostsPageModule {}
