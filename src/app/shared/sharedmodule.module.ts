import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPostPage } from '../add-post/add-post.page';
import { IonicModule } from '@ionic/angular';
import { UpdateRepbaseComponent } from '../repbases/update-repbase/update-repbase.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [
      AddPostPage,
      UpdateRepbaseComponent
    ],
    exports: [
      AddPostPage,
      UpdateRepbaseComponent
    ]
})
export class SharedModule {}
