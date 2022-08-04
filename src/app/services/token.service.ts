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
    let token = localStorage.getItem('token');
    let tomorrow = localStorage.getItem('time');
    if (token === null) {
      return false;
    }

    if (Date.now() >= parseInt(tomorrow)) {
      return false;
    }

    return true;
  }

  clearToken(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
