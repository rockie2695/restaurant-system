import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public username = '';

  constructor(
    private tokenService: TokenService,
    private loadingController: LoadingController,
    private userService: UserService,
    private router: Router,
    private emailComposer: EmailComposer,
    public platform: Platform
  ) {}

  ngOnInit() {
    //only do once when page is loaded
    this.init();
  }

  async init() {
    /*if (this.tokenService.checkToken() === false) {
      this.tokenService.clearToken();
      return;
    }*/

    const loading = await this.loadingController.create({
      message: 'connecting...',
    });
    loading.present();
    try {
      const response = await this.userService.getLoginUser();
      console.log(response);
      this.username = response.user.username;
      loading.dismiss();
    } catch (err) {
      loading.dismiss();
      if (err.status === 401) {
        this.tokenService.clearToken();
        this.router.navigateByUrl('/login');
        return;
      }
      console.log(err);
      return throwError(err);
    }
  }

  sendEmail() {
    if (!this.platform.is('desktop')) {
      const email = {
        to: 'rockie2695@yahoo.com.hk',
        subject: '',
        body: '',
        isHtml: true,
      };

      // Send a text message using default options
      this.emailComposer.open(email);
    }
  }
}
