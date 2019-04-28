import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.authService.authSubject.subscribe(res => this.isAuthenticated = res);
  }

  onLogout() {
    this.router.navigateByUrl('/');
    this.authService.logout()
    .then(() => {
      this.sharedService.createToast('Ciao!');
    });
  }
}
