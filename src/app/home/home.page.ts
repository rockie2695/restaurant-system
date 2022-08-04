import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public username: string = '';

  constructor(
    private tokenService: TokenService,
    private loadingController: LoadingController,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.tokenService.checkToken() === false) {
      this.tokenService.clearToken();
      return;
    }

    try {
      const loading = await this.loadingController.create({
        message: 'connecting...',
      });

      loading.present();

      const response = await this.userService.getLoginUser();
      this.username = response.user.username;
      loading.dismiss();
    } catch (err) {
      if (err.status === 401) {
        this.tokenService.clearToken();
        this.router.navigate(['']);
        return;
      }
      console.log(err);
      return throwError(err);
    }
  }
}
