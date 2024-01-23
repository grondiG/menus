import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { RestaurantsComponent } from "./pages/restaurants/restaurants.component";
import { RestaurantComponent } from "./core/containers/restaurant/restaurant.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
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
