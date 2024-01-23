import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export type ValueOf<T> = T[keyof T];

export const RoutePath = {
  HOME: 'home',
  RESTAURANTS: 'restaurants'
} as const;

export type RoutePath = ValueOf<typeof RoutePath>;

export interface RouterData {
  path: RoutePath,
  title: string,
}

export const routerData: RouterData[] = [
  {
    path: 'restaurants',
    title: 'Restaurants'
  }
];

export const ROUTER_DATA = new InjectionToken<RouterData[]>('router data', {
  factory: () => routerData,
})

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: RoutePath.HOME,
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'restaurants',
    title: 'Restaurants',
    loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule),
  },
  {
    path: 'orders',
    component: HomeComponent,
    title: 'Orders'
  },
  {
    path: 'profile',
    component: HomeComponent,
    title: 'Profile'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
