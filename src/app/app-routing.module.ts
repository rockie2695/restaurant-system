import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
   },
  {
    path: 'login',
    loadChildren: () =>
      import('./page/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
 ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
