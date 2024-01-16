import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'restaurants', loadChildren: () => import('./modules/restaurants/restaurants.module').then(m => m.RestaurantsModule)},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
