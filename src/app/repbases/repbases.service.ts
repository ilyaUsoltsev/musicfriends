import { Injectable } from '@angular/core';
import { Repbase } from '../models/repbase.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RepbasesService {

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService
  ) { }

  addRepbase(repbase: Repbase) {
    return this.afDB.collection(`${repbase.city.name}+Репбаза`).doc(repbase.id).set(repbase);
  }

  addRepbaseToUser(repbase: Repbase) {
    return this.afDB.collection(`users`).doc(repbase.userId)
    .collection('repbases').doc(repbase.id).set(repbase);
  }

  getAllRepbases(city: string) {
    return this.afDB.collection(`${city}+Репбаза`, ref => ref
    .limit(200))
    .snapshotChanges().pipe(
      map((docData) => {
        return docData.map( doc => {
          return doc.payload.doc.data() as Repbase;
        });
      }),
    );
  }

  getRepbase(id: string, city: string) {
    return this.afDB.collection(`${city}+Репбаза`).doc(id).get();
  }

  deleteRepbase(repbase: Repbase) {
    return Promise.all([
      this.afDB.collection(`${repbase.city.name}+Репбаза`).doc(`${repbase.id}`).delete(),
      this.afDB.collection('users').doc(`${this.authService.userId}`)
      .collection('repbases').doc(`${repbase.id}`).delete()
    ]);
  }

  updateRepbase(repbase: Repbase) {
    return this.afDB.collection(`${repbase.city.name}+Репбаза`).doc(`${repbase.id}`).update(repbase);
  }

  updateRepbaseToUser(repbase: Repbase) {
    return this.afDB.collection('users').doc(`${this.authService.userId}`)
    .collection('repbases').doc(`${repbase.id}`).update(repbase);
  }
}
