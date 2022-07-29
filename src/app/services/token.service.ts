import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  checkToken(): void {
    let eToken = localStorage.getItem('t');
    console.log(eToken)
    if (eToken === null) {
      this.clearToken();
    }
  }

  clearToken(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
