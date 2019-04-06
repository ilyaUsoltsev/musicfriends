import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPostPage } from '../add-post/add-post.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [
      AddPostPage
    ],
    exports: [
      AddPostPage
    ]
})
export class SharedModule {}
