import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutePath, RouteTitle } from "./app.config";
import { authenticationGuard } from "./core/guards/authentication.guard";
import { HomeComponent } from "./pages/home/home.component";
import { skipLoginGuard } from './core/guards/skip-login.guard';
import { emptyCartGuard } from './core/guards/empty-cart.guard';
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: RoutePath.HOME,
    component: HomeComponent,
    title: RouteTitle.HOME
  },
  {
    path: RoutePath.RESTAURANTS,
    title: RouteTitle.RESTAURANTS,
    loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule),
  },
  {
    path: RoutePath.ORDERS,
    title: RouteTitle.ORDERS,
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [authenticationGuard]
  },
  {
    path: RoutePath.PROFILE,
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    title: RouteTitle.PROFILE,
    canActivate: [skipLoginGuard]
  },
  {
    path: RoutePath.CHECKOUT,
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule),
    title: RouteTitle.CHECKOUT,
    canActivate: [authenticationGuard, emptyCartGuard]
  },
  {
    path: RoutePath.ADMIN,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    title: RouteTitle.ADMIN,
    canActivate: [authenticationGuard, adminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
