import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router, private encryptService: EncryptService) {}

  saveToken({ token, time }): void {
    const encryptToken = this.encryptService.encrypt(token);
    localStorage.setItem('token', encryptToken);
    localStorage.setItem('time', time);
  }

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    const tomorrow = localStorage.getItem('time');
    if (token === null) {
      return false;
    }

    if (Date.now() >= parseInt(tomorrow, 10)) {
      return false;
    }

    return true;
  }

  clearToken(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
