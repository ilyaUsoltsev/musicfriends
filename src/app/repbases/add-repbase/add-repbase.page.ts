import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CITIES, CITIES_OBJ } from '../../db/cities';
import { PlaceLocation } from '../../models/location.model';
import { AuthService } from '../../auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { RepbasesService } from '../repbases.service';
import { Router } from '@angular/router';
import { Repbase } from '../../models/repbase.model';

@Component({
  selector: 'app-add-repbase',
  templateUrl: './add-repbase.page.html',
  styleUrls: ['./add-repbase.page.scss'],
})
export class AddRepbasePage implements OnInit {
  citiesNames = CITIES;
  cities = CITIES_OBJ;
  form: FormGroup;
  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private repbasesService: RepbasesService,
              private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      city: new FormControl(this.authService.userCity.name, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(300)]
      }),
      priceFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      website: new FormControl(null, {
        updateOn: 'blur'
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onAddRepbase() {
    if (!this.form.valid) {
      return;
    }
    const newRepbase: Repbase = {
      id: UUID.UUID(),
      title: this.form.value.title,
      description: this.form.value.description,
      priceFrom: +this.form.value.priceFrom,
      location: this.form.value.location,
      phone: this.form.value.phone,
      website: this.form.value.website || '',
      username: this.authService.username,
      city: this.cities[this.form.value.city],
      userId: this.authService.userId
    };
    this.loadingCtrl.create({
      message: 'Сохраняем...'
    })
    .then( loadingEl => {
      loadingEl.present();
      Promise.all([
        this.repbasesService.addRepbase(newRepbase),
        this.repbasesService.addRepbaseToUser(newRepbase)
      ])
      .then( () => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/repbases']);
      });
    });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({location: location});
  }
}
