import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
import { CITIES, CITIES_OBJ } from '../db/cities';
import { City } from '../models/location.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Repbase } from '../models/repbase.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading = false;
  private _userIsAuthenticated = false;
  private _userId: string;
  private _username: string;
  private _userDescription: string;
  private _userImage: string;
  private _userCity: any;
  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFirestore) { }

  citiesObj = CITIES_OBJ;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get username() {
    return this._username;
  }

  get userCity(): City {
    return this._userCity;
  }

  get userDescription() {
    return this._userDescription;
  }
  get userImage() {
    return this._userImage;
  }

  get userId() {
    return this._userId;
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      this._userIsAuthenticated = true;
      return this.afDB.doc(`users/${ response.user.uid }`).get().toPromise();
    })
    .then( (user) => {
      this._username = user.data().username;
      this._userId = user.data().uid;
      this._userDescription = user.data().description;
      this._userImage = user.data().image;
      this._userCity = user.data().city as City;

    });
  }

  logout() {
    return this.afAuth.auth.signOut().then( () => {
      this._userIsAuthenticated = false;
      this._userId = null;
      this._username = null;
      this._userCity = null;
    });
  }

  createUser(email, password, username, city) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( (response) => {
        this.afDB.collection(`users`).doc(`${response.user.uid}`).set({
          uid: response.user.uid,
          username: username,
          email: email,
          city: this.citiesObj[city]
        });
        return response.user.uid;
      })
      .then((id) => {
        this._userIsAuthenticated = true;
        this._username = username;
        this._userId = id;
        this._userCity = this.citiesObj[city];
      });
  }

  updateUser(description, image) {
    return this.afDB.collection('users').doc(`${this._userId}`).update({
      description,
      image
    });
  }

  getUser() {
    return this.afDB.collection('users').doc(`${this._userId}`).get();
  }

  getUserPosts() {
    return this.afDB.collection('users').doc(`${this._userId}`)
      .collection('posts', ref => ref
      .orderBy('date', 'desc')).snapshotChanges().pipe(
        map((docData) => {
          return docData.map( doc => {
            return doc.payload.doc.data() as Post;
          });
        }),
      );
  }

  getUserRepbases() {
    return this.afDB.collection('users').doc(`${this._userId}`)
      .collection('repbases').snapshotChanges().pipe(
        map((docData) => {
          return docData.map( doc => {
            return doc.payload.doc.data() as Repbase;
          });
        }),
      );
  }
}
