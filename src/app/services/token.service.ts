import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router, private encryptService: EncryptService) {}

  saveToken(token: string): void {
    const encryptToken = this.encryptService.encrypt(token);
    localStorage.setItem('token', encryptToken);
  }

  checkToken(): boolean {
    let token = localStorage.getItem('token');
    if (token === null) {
      return false;
    }
    
    return true;
  }

  clearToken(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
