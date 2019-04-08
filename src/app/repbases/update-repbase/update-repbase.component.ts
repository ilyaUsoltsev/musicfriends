import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Repbase } from '../../models/repbase.model';
import { AuthService } from '../../auth/auth.service';
import { City, PlaceLocation } from '../../models/location.model';
import { MapModalComponent } from '../../shared/map-modal/map-modal.component';

@Component({
  selector: 'app-update-repbase',
  templateUrl: './update-repbase.component.html',
  styleUrls: ['./update-repbase.component.scss'],
})
export class UpdateRepbaseComponent implements OnInit {

  @Input() repbase: Repbase;
  selectedCity: City;
  // pickedLocation: PlaceLocation;
  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.selectedCity = this.repbase.city;
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onUpdate(form) {
    const newRepbase: Repbase = {
      id: this.repbase.id,
      city: this.repbase.city,
      title: form.value.title,
      phone: form.value.phone,
      description: form.value.description,
      priceFrom: form.value.priceFrom,
      location: this.repbase.location,
      username: this.authService.username,
      userId: this.authService.userId,
    };
    this.modalCtrl.dismiss({repbase: newRepbase}, 'confirm');
  }

  // onShowFullMap() {
  //   this.modalCtrl.create({component: MapModalComponent,
  //   componentProps: {
  //     city: this.repbase.city,
  //     markers: [this.repbase],
  //     selectable: true,
  //     cloeButtonText: 'Close',
  //     title: this.repbase.location.address
  //   }
  //   })
  //   .then((modal) => {
  //     modal.onDidDismiss().then(modalData => {
  //       if (!modalData.data) {
  //         return;
  //       }
  //       this.pickedLocation = {
  //         lat: modalData.data.lat,
  //         lng: modalData.data.lng,
  //         address: null,
  //         staticMapImageUrl: null
  //       };
  //     });
  //     modal.present();
  //   }
  // );
  // }
}
