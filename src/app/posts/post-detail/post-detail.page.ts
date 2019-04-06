import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Post } from '../../models/post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AddPostPage } from '../../add-post/add-post.page';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit, OnDestroy {
  post: Post;
  isLoading = false;
  postSub = new Subscription();
  userId: string;
  postId: string;
  city: string;
  instrument: string;
  mode: string;

  constructor(private activatedRoute: ActivatedRoute,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private router: Router,
              private authService: AuthService,
              private sharedService: SharedService,
              private postsService: PostsService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('postId')) {
        this.navCtrl.navigateBack('/');
        return;
      }
      console.log('postdetail');
      this.postId = paramMap.get('postId');
      this.city = paramMap.get('city');
      this.instrument = paramMap.get('instrument');
      this.mode = paramMap.get('mode');
      this.userId = this.authService.userId;
      this.getPost();
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onEditPost() {
    this.actionSheetCtrl.create({
      header: 'Редактировать?',
      buttons: [
        {
        text: 'Да',
        handler: () => {
          this.openPostModal();
        }
        },
        {
        text: 'Отмена',
        role: 'cancel'
        }
      ]
    }).then(actionSheetEl => actionSheetEl.present());
  }

  openPostModal() {
    this.modalCtrl.create({
      component: AddPostPage,
      componentProps: {type: 'update', post: this.post}
    }
    )
    .then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(result => {
      // console.log(result.data, result.role);
      if (result.role === 'confirm') {
        const newPost: Post = result.data.post;
        this.postsService.updatePost(newPost, this.post.id)
        .then(() => {
          this.isLoading = true;
          this.getPost();
          this.router.navigateByUrl(`posts/${this.post.id}/${newPost.city}/${newPost.instrument}/${newPost.mode}`);
        });
      }
    }
  );
  }

  onDeletePost() {
    this.actionSheetCtrl.create({
      header: 'Точно удалить?',
      buttons: [
        {
        text: 'Удалить',
        role: 'destructive',
        handler: () => {
          this.postsService.deletePost(this.post).then(() => {
            this.router.navigateByUrl('/posts');
          }).then(() => {
            this.sharedService.createToast('Удалили');
          });
        }
        },
        {
        text: 'Отмена',
        role: 'cancel'
        }
      ]
    }).then(actionSheetEl => actionSheetEl.present());
  }

  getPost() {
    this.postSub = this.postsService.getPost(this.postId, this.city, this.instrument, this.mode)
    .subscribe(
      (post) => {
        this.post = post.data() as Post;
        this.isLoading = false;
      }
    );
  }

}
