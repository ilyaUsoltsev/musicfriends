import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { AuthService } from '../auth/auth.service';
import { UUID } from 'angular2-uuid';
import { CITIES } from '../db/cities';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  @Input() type: string;
  @Input() post: Post;
  cityFromUser: string;
  citiesNames = CITIES;
  constructor(private modalCtrl: ModalController,
              private authService: AuthService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewWillEnter() {
    this.cityFromUser = this.authService.userCity.name;
  }

  onAddPost(form) {
    const newPost: Post = {
      id: this.post ? this.post.id : UUID.UUID(),
      imageUrl: form.value.imageUrl,
      date: new Date(Date.now()),
      title: form.value.title,
      description: form.value.description,
      mode: this.post ? this.post.mode : form.value.mode,
      style: form.value.style,
      instrument: this.post ? this.post.instrument : form.value.instrument,
      city: this.post ? this.post.city : form.value.city,
      username: this.authService.username,
      userId: this.authService.userId
    };
    this.modalCtrl.dismiss({post: newPost, type: this.type}, 'confirm');
  }

}
