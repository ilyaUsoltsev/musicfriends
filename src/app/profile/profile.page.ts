import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../shared/shared.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Repbase } from '../models/repbase.model';
import { RepbasesService } from '../repbases/repbases.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  userSub = new Subscription();
  postsSub = new Subscription();
  repbasesSub = new Subscription();
  isLoading = false;
  image: string;
  description: string;
  username;
  user: User;
  posts: Post[] = [];
  repbases: Repbase[] = [];

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.userSub =
    this.authService.getUser().subscribe((user) => {
      this.user = user.data() as User;
      this.description = this.user.description || '';
      this.image = this.user.image || '';
    });
    this.postsSub = this.authService.getUserPosts().subscribe((posts) => this.posts = posts);
    this.repbasesSub = this.authService.getUserRepbases().subscribe((repbases) => {
      this.repbases = repbases;
    });
  }

  onSaveProfile() {
    this.authService.updateUser(this.description, this.image)
      .then(() => this.sharedService.createToast('Сохранили!'));
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.userSub.unsubscribe();
    this.repbasesSub.unsubscribe();
  }

}
