import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toastCtrl: ToastController) { }


  createToast(message: string) {
    this.toastCtrl.create({
      message: message,
      color: 'dark',
      position: 'top',
      duration: 700
    })
    .then(el => el.present());
  }
}
