import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'food-and-drinks',
        loadChildren: () =>
          import('../food-and-drinks/food-and-drinks.module').then(
            (m) => m.FoodAndDrinksPageModule
          ),
      },
      {
        path: 'set',
        loadChildren: () =>
          import('../set/set.module').then((m) => m.SetPageModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../order/order.module').then((m) => m.OrderPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/aa',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/aa',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
