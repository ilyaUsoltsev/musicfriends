import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { RepbasesService } from '../repbases.service';
import { Repbase } from '../../models/repbase.model';
import { MapModalComponent } from '../../shared/map-modal/map-modal.component';

@Component({
  selector: 'app-repbase-detail',
  templateUrl: './repbase-detail.page.html',
  styleUrls: ['./repbase-detail.page.scss'],
})
export class RepbaseDetailPage implements OnInit {
  isLoading = false;
  repbase: Repbase;
  repbaseId: string;
  repbaseCity: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private repbasesService: RepbasesService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('repbaseId')) {
        this.navCtrl.navigateBack('/');
        return;
      }
      this.repbaseId = paramMap.get('repbaseId');
      this.repbaseCity = paramMap.get('city');
      this.getRepbase();
    });
  }


  getRepbase() {
    this.isLoading = true;
    this.repbasesService.getRepbase(this.repbaseId, this.repbaseCity)
      .subscribe((repbase) => {
        this.repbase = repbase.data() as Repbase;
        this.isLoading = false;
      });
    }

  onShowFullMap() {
      this.modalCtrl.create({component: MapModalComponent,
      componentProps: {
        center: {lat: this.repbase.location.lat, lng: this.repbase.location.lng},
        selectable: false,
        cloeButtonText: 'Close',
        title: this.repbase.location.address
      }
      })
        .then(el => el.present());
    }
}
