import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap, take, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  _posts = new BehaviorSubject<Post[]>([]);
  generatedId: string;
  isLoading = new BehaviorSubject(false);

  constructor(private http: HttpClient,
    private authService: AuthService,
    private afDB: AngularFirestore) { }

  get posts() {
    return this._posts.asObservable() as Observable<Post[]>;
  }

  getAllPost(city: string, instrument: string, mode: string) {
    return this.afDB.collection(`${city}+${instrument}+${mode}`, ref => ref
    .orderBy('date', 'desc').limit(200))
    .snapshotChanges().pipe(
      map((docData) => {
        return docData.map( doc => {
          return doc.payload.doc.data() as Post;
        });
      }),
    );
  }

  getPost(id: string, city: string, instrument: string, mode: string) {
    return this.afDB.collection(`${city}+${instrument}+${mode}`).doc(id).get();
  }

  addPost(newPost: Post) {
    return this.afDB.collection(`${newPost.city}+${newPost.instrument}+${newPost.mode}`).doc(`${newPost.id}`)
    .set(newPost);
  }

  addPostToUser(newPost: Post) {
    return this.afDB.collection(`users`).doc(`${newPost.userId}`).collection(`posts`).doc(`${newPost.id}`)
    .set(newPost);
  }

  updatePost(newPost: Post, id: string) {
    return this.afDB.collection(`${newPost.city}+${newPost.instrument}+${newPost.mode}`).doc(`${id}`).update(newPost);
  }

  deletePost(newPost) {
    return Promise.all([
      this.afDB.collection(`${newPost.city}+${newPost.instrument}+${newPost.mode}`).doc(`${newPost.id}`).delete(),
      this.afDB.collection(`users`).doc(`${this.authService.userId}`)
        .collection('posts').doc(`${newPost.id}`).delete()
    ]);
  }

}
