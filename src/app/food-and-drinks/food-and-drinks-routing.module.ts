import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodAndDrinksPage } from './food-and-drinks.page';

const routes: Routes = [
  {
    path: '',
    component: FoodAndDrinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodAndDrinksPageRoutingModule {}
