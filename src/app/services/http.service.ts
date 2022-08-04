import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { EncryptService } from './encrypt.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private host = 'http://localhost:3000';
  private httpOptions: any = {
    httpOptions: {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    },
    httpOptionsWithToken: {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          (localStorage.getItem('token') === null
            ? ''
            : this.encryptService.decrypt(localStorage.getItem('token'))),
      }),
    },
  };

  constructor(
    private http: HttpClient,
    private encryptService: EncryptService,
    private tokenService: TokenService
  ) {}

  getRequest(uri?: string, queryString?: string): Observable<any> {
    if (uri === undefined) {
      uri = '';
    }
    if (queryString === undefined) {
      queryString = '';
    }

    if (this.tokenService.checkToken()) {
      return this.http
        .get(
          this.host + uri + '?' + queryString,
          this.httpOptions.httpOptionsWithToken
        )
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .get(this.host + uri + '?' + queryString, this.httpOptions.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  postRequest(uri?: string, data?: any): Observable<any> {
    /*if (this.tokenService.checkToken()) {
      const accessToken = 'access_token=' + this.tokenService.decryptToken();
      console.log(this.host + uri + '?' + accessToken);
      return this.http
        .post(this.host + uri + '?' + accessToken, data, this.httpOptions)
        .pipe(catchError(this.handleError));
    }*/
    //if (!this.tokenService.checkToken()) {
    return this.http
      .post(this.host + uri, data, this.httpOptions.httpOptions)
      .pipe(catchError(this.handleError));
    //}
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
