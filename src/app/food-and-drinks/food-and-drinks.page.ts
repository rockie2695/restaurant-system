import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-and-drinks',
  templateUrl: './food-and-drinks.page.html',
  styleUrls: ['./food-and-drinks.page.scss'],
})
export class FoodAndDrinksPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    console.log('here2');
  }
}
