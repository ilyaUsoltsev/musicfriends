import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { RepbasesService } from '../repbases.service';
import { Repbase } from '../../models/repbase.model';
import { MapModalComponent } from '../../shared/map-modal/map-modal.component';
import { AuthService } from '../../auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { UpdateRepbaseComponent } from '../update-repbase/update-repbase.component';

@Component({
  selector: 'app-repbase-detail',
  templateUrl: './repbase-detail.page.html',
  styleUrls: ['./repbase-detail.page.scss'],
})
export class RepbaseDetailPage implements OnInit {
  isLoading = false;
  repbase: Repbase;
  userId: string;
  repbaseId: string;
  repbaseCity: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private router: Router,
    private sharedService: SharedService,
    private actionSheetCtrl: ActionSheetController,
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
      this.userId = this.authService.userId;
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
        city: this.repbase.city,
        markers: [this.repbase],
        selectable: false,
        cloeButtonText: 'Close',
        title: this.repbase.location.address
      }
      })
        .then(el => el.present());
    }

    onEditRepbase() {
      this.actionSheetCtrl.create({
        header: 'Редактировать?',
        buttons: [
          {
          text: 'Да',
          handler: () => {
            this.openRepbaseModal();
          }
          },
          {
          text: 'Отмена',
          role: 'cancel'
          }
        ]
      }).then(actionSheetEl => actionSheetEl.present());
    }

    openRepbaseModal() {
      this.modalCtrl.create({
        component: UpdateRepbaseComponent,
        componentProps: {repbase: this.repbase}
      }
      )
      .then(modalElement => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then(result => {
        if (result.role === 'confirm') {
          const newRepbase: Repbase = result.data.repbase;
          Promise.all([
            this.repbasesService.updateRepbase(newRepbase),
            this.repbasesService.updateRepbaseToUser(newRepbase)
          ])
          .then(() => {
            this.router.navigateByUrl('/repbases');
            this.sharedService.createToast('Сохранили');
          });
          }
        }
      );
    }

    onDeleteRepbase() {
      this.actionSheetCtrl.create({
        header: 'Точно удалить?',
        buttons: [
          {
          text: 'Удалить',
          role: 'destructive',
          handler: () => {
            this.repbasesService.deleteRepbase(this.repbase).then(() => {
              this.router.navigateByUrl('/repbases');
            }).then(() => {
              this.sharedService.createToast('Удалили');
            });
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
