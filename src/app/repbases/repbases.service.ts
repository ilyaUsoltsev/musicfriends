import { Injectable } from '@angular/core';
import { Repbase } from '../models/repbase.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepbasesService {

  constructor(
    private afDB: AngularFirestore
  ) { }

  addRepbase(repbase: Repbase) {
    return this.afDB.collection(`${repbase.city.name}+Репбаза`).doc(repbase.id).set(repbase);
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
}
