import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestaurantsComponent} from "../../pages/restaurants/restaurants.component";
import {RouterModule, Routes} from "@angular/router";
import {RestaurantComponent} from "../../core/containers/restaurant/restaurant.component";

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent
  },
  {
    path: ':id',
    component: RestaurantComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
