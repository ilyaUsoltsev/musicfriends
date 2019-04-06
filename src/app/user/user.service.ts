import { Injectable } from '@angular/core';
import { USERS } from '../db/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private _users = new BehaviorSubject<User[]>(USERS);
constructor() { }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  getUserByUsername(username: string) {
    return this.users.pipe(
      take(1),
      map( users => users.find(u => u.username === username))
    );
  }

  uniqueUser(username: string) {
    return true;
  }
}
