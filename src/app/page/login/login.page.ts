import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { NavController } from '@ionic/angular';

import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    public toastController: ToastController,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private navController: NavController
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    if (this.tokenService.checkToken() === true) {
      this.router.navigateByUrl('/tabs/home');
    }
  }

  async login() {
    if (!this.loginForm.valid) {
      const toast = await this.toastController.create({
        message: '所有欄位必須填寫。',
        duration: 2000,
      });
      toast.present();
      return;
    }

    try {
      const response = await this.userService.loginUser(this.loginForm.value);
      this.tokenService.saveToken(response);
      //this.router.navigateByUrl('/tabs/home');
      //this.navController.navigateBack(['tabs/home']);
      window.location.href = '/tabs/home';
    } catch (err) {
      if (err.status === 401) {
        this.clean();
        const toast = await this.toastController.create({
          message: '員工編號或密碼錯誤，請重新輸入。',
          duration: 2000,
        });
        toast.present();
        return;
      }

      if (err.status === 0) {
        this.clean();
        const toast = await this.toastController.create({
          message: 'server connection error',
          duration: 2000,
        });
        toast.present();
      }
      console.log(err);
      return throwError(err);
    }
  }

  clean() {
    this.loginForm.setValue({
      username: '',
      password: '',
    });
  }
}
