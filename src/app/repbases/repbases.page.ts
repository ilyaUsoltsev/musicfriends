import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Repbase } from '../models/repbase.model';
import { RepbasesService } from './repbases.service';
import { CITIES } from '../db/cities';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-repbases',
  templateUrl: './repbases.page.html',
  styleUrls: ['./repbases.page.scss'],
})
export class RepbasesPage implements OnInit, OnDestroy {
  RepbasesSub = new Subscription();
  cities = CITIES;
  isLoading = false;
  repbases: Repbase[];
  selectedCity = this.authService.userIsAuthenticated ? this.authService.userCity.name : CITIES[0];

  constructor(private authService: AuthService,
              private repbasesService: RepbasesService,
              private actionSheetCtrl: ActionSheetController,
              private router: Router
  ) { }

  ngOnInit() {
    this.loadRepbases();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
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

}
