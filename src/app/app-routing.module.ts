import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { RoutePath, RouteTitle } from "./app.config";
import { ProfileComponent } from "./pages/profile/profile.component";

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
    component: HomeComponent,
    title: RouteTitle.ORDERS
  },
  {
    path: RoutePath.PROFILE,
    component: ProfileComponent,
    title: RouteTitle.PROFILE
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
