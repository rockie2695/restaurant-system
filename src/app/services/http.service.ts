import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private host = 'http://arpa-api.arpainfinity.com:3000/api';
  private httpOptions: any = {
    httpOptions: {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    },
    /*httpOptionsWithToken: {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.decryptToken(),
      }),
    },*/
  };

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  postRequest(uri?: string, data?: any): Observable<any> {
    /*if (this.tokenService.checkToken()) {
      const accessToken = 'access_token=' + this.tokenService.decryptToken();
      console.log(this.host + uri + '?' + accessToken);
      return this.http
        .post(this.host + uri + '?' + accessToken, data, this.httpOptions)
        .pipe(catchError(this.handleError));
    }*/
    //if (!this.tokenService.checkToken()) {
      console.log(this.host + uri, data, this.httpOptions)
      return this.http
        .post(this.host + uri, data, this.httpOptions)
        .pipe(catchError(this.handleError));
    //}
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.status);
  }
}
