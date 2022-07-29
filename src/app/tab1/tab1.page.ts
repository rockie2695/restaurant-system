import { Component } from '@angular/core';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private tokenService: TokenService,) {}

  ngOnInit(){
    this.tokenService.checkToken()
  }

}
