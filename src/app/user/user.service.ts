import { Injectable } from '@angular/core';
import { USERS } from '../db/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private _user: User;

constructor(
  private afDB: AngularFirestore
) { }


  getUserByUsername(username: string) {
    return this.afDB.collection('users', ref => ref.where('username', '==', username))
    .snapshotChanges().pipe(
      take(1),
      map((docData) => {
        return docData.map( doc => {
          return doc.payload.doc.data() as User;
        });
      }),
    );
  }

  uniqueUser(username: string) {
  return this.getUserByUsername(username).pipe(
      map(users => {
        if (users.length === 0) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
