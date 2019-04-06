import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  username: string;
  user: User;
  userSub = new Subscription();
  isLoading = false;
  constructor(private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('username')) {
        this.navCtrl.navigateBack('/');
        return;
      }
      this.username = paramMap.get('username');
      this.userSub = this.userService.getUserByUsername(this.username).subscribe(
        (user) => {
          this.isLoading = false;
          this.user = user;
        }
      );
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
