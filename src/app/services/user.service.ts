import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri: string = '/users';

  constructor(private httpService: HttpService) {}

  loginUser(data: any): Promise<any> {
    return this.httpService.postRequest(this.uri + '/login', data).toPromise();
  }

  getLoginUser(): Promise<any> {
    return this.httpService.getRequest(this.uri + '/loginUser').toPromise();
  }
}
