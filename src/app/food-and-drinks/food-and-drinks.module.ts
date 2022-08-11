import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodAndDrinksPageRoutingModule } from './food-and-drinks-routing.module';

import { FoodAndDrinksPage } from './food-and-drinks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodAndDrinksPageRoutingModule
  ],
  declarations: [FoodAndDrinksPage]
})
export class FoodAndDrinksPageModule {}
