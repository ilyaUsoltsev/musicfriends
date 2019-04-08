import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Repbase } from '../models/repbase.model';
import { RepbasesService } from './repbases.service';
import { CITIES, CITIES_OBJ } from '../db/cities';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core';
import { MapModalComponent } from '../shared/map-modal/map-modal.component';
import { City } from '../models/location.model';

@Component({
  selector: 'app-repbases',
  templateUrl: './repbases.page.html',
  styleUrls: ['./repbases.page.scss'],
})
export class RepbasesPage implements OnInit, OnDestroy {
  RepbasesSub = new Subscription();
  cities: {[key: string]: City} = CITIES_OBJ;
  citiesNames = CITIES;
  isLoading = false;
  viewMode = 'list';
  repbases: Repbase[];
  selectedCity: string;
  @ViewChild('listsegment') listsegment: ElementRef;
  @ViewChild('mapsegment') mapsegment: ElementRef;

  constructor(private authService: AuthService,
              private repbasesService: RepbasesService,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private router: Router
  ) { }

  ngOnInit() {
    // this.loadRepbases();
  }

  ionViewWillEnter() {
    this.selectedCity = this.authService.userIsAuthenticated ? this.authService.userCity.name : 'Москва';
    this.loadRepbases();
  }

  onAddRepbase() {
    if (this.authService.userIsAuthenticated) {
      this.actionSheetCtrl.create({
        header: 'Добавить репбазу?',
        buttons: [
          {
          text: 'Да',
          handler: () => {
            this.router.navigateByUrl('/repbases/add-repbase');
          }
          },
          {
          text: 'Отмена',
          role: 'cancel'
          }
        ]
      }).then(actionSheetEl => actionSheetEl.present());
    } else {
      this.actionSheetCtrl.create({
        header: 'Чтобы добавить репбазу, нужно войти',
        buttons: [
          {
          text: 'Войти',
          handler: () => {
            this.router.navigateByUrl('/auth');
          }
          },
          {
          text: 'Отмена',
          role: 'cancel'
          }
        ]
      }).then(actionSheetEl => actionSheetEl.present());
    }
  }

  onCityChange() {
    this.loadRepbases();
  }

  loadRepbases() {
    this.isLoading = true;
    this.RepbasesSub = this.repbasesService.getAllRepbases(this.selectedCity).subscribe((repbases) => {
      this.repbases = repbases;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.RepbasesSub.unsubscribe();
  }

  onShowMap() {
    this.modalCtrl.create({component: MapModalComponent,
    componentProps: {
      city: this.cities[this.selectedCity],
      markers: this.repbases,
      selectable: false,
      cloeButtonText: 'Close',
      title: `Базы в городе ${this.selectedCity}`
    }
    })
      .then(el => el.present());
  }

}
