import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared/shared.service';
import { CITIES } from '../db/cities';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;
  currentUser: string;
  isLoading = false;
  cities = CITIES;
  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private navCtrl: NavController,
    private sharedService: SharedService,
    private alertCtrl: AlertController ) { }

  ngOnInit() {
    console.log(this.authService.userIsAuthenticated);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    const password2 = form.value.password2;
    const city = form.value.city;

    if (!this.isLogin && this.formErrors(username, password, password2)) {
      return;
    }

    if (this.isLogin) {
      this.authService.login(email, password)
      .then(() => {
        this.isLoading = false;
        this.navCtrl.pop()
          .then().catch(() => this.router.navigateByUrl('/'));
        // this.router.navigateByUrl('/');
      })
      .then(() => {
        this.sharedService.createToast(`Привет, ${this.authService.username}!`);
      })
      .catch(err => this.showAlert('Ошибка', err));
    } else {
      this.authService.createUser(email, password, username, city)
        .then( () => {
          this.showAlert('Успешно!', `${this.authService.username}, твой аккаунт создан!`);
          this.navCtrl.pop()
          .then().catch(() => this.router.navigateByUrl('/'));
        })
        .catch( (err) => {
          this.showAlert('Oшибка', err);
        });
    }
  }

  onSwitchAuth() {
    this.isLogin = !this.isLogin;
  }

  formErrors(username: string, password: string, password2: string) {
    if (password !== password2) {
      this.showAlert('Ошибка', 'Пароли не совпадают :(');
      return true;
    } else if (!this.userService.uniqueUser(username)) {
      this.showAlert('Oшибка', 'username занят :(');
      return true;
    } else {
      return false;
    }
  }

  showAlert(header: string, message: string) {
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(el => {
      this.isLoading = false;
      el.present();
    });
  }

}
