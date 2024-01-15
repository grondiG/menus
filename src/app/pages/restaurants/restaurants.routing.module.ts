import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestaurantsComponent} from "./restaurants.component";
import {RouterModule, Routes} from "@angular/router";
import {RestaurantComponent} from "./restaurant/restaurant.component";

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
