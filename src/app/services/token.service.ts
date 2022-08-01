import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  checkToken(): boolean {
    let eToken = localStorage.getItem('t');
    console.log(eToken);
    if (eToken === null) {
      return false;
    }
    return true;
  }

  clearToken(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
