import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

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

  constructor(public toastController: ToastController,private userService:UserService) {}

  ngOnInit() {}

  async login() {
    if (!this.loginForm.valid) {
      const toast = await this.toastController.create({
        message: '所有欄位必須填寫。',
        duration: 2000,
      });
      toast.present();
      return;
    }

    this.userService.loginUser(this.loginForm.value)
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
