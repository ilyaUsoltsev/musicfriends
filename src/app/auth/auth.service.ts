import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
import { CITIES, CITIES_OBJ } from '../db/cities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId: string;
  private _username: string;
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

  get userCity() {
    return this._userCity;
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
      this._userCity = user.data().city;
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
      })
      .then(() => {
        this._userIsAuthenticated = true;
        this._username = username;
      });
  }
}
