import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { AddPostPage } from '../add-post/add-post.page';
import { Post } from '../models/post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})

export class PostsPage implements OnInit, OnDestroy {
  isLoading: boolean;
  posts: Post[];
  postsSub = new Subscription();
  instrument = 'Гитара';
  city = 'Москва';
  mode = 'Музыкант';

  constructor(private actionSheetCtrl: ActionSheetController,
    private postsService: PostsService,
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    private modalCtrl: ModalController) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadPosts();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.mode = event.detail.value;
    this.isLoading = true;
    this.loadPosts();
  }

    onAddPost() {
      if (this.authService.userIsAuthenticated) {
        this.actionSheetCtrl.create({
          header: 'Добавить объявление?',
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
      } else {
        this.actionSheetCtrl.create({
          header: 'Чтобы добавить объявление, нужно войти',
          buttons: [
            {
            text: 'Войти',
            handler: () => {
              this.router.navigateByUrl('/auth');
            }
            },
            {
            text: 'Отмена',
            role: 'cancel'
            }
          ]
        }).then(actionSheetEl => actionSheetEl.present());
      }
    }

    openPostModal() {
      this.modalCtrl.create({
        component: AddPostPage,
        componentProps: {type: 'new', post: null}
      }
      )
      .then(modalElement => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then(result => {
        if (result.role === 'confirm') {
          const newPost: Post = result.data.post;
          this.postsService.addPost(newPost)
          .then(() => {
            this.sharedService.createToast('Добавлено');
          });
          }
        }
      );
    }

    onCityChange() {
      this.isLoading = true;
      this.loadPosts();
    }

    onInstrumentChange() {
      this.isLoading = true;
      this.loadPosts();
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }

    loadPosts() {
      this.postsSub = this.postsService.getAllPost(this.city, this.instrument, this.mode)
      .subscribe(res => {
        this.isLoading = false;
        this.posts = res;
      });
    }
}
