import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RestaurantsComponent} from "./restaurants.component";
import {RestaurantsRoutingModule} from "./restaurants.routing.module";
import { RestaurantComponent } from './restaurant/restaurant.component';



@NgModule({
  declarations: [
    RestaurantsComponent,
    RestaurantComponent
  ],
  imports: [
    SharedModule,
    RestaurantsRoutingModule,
  ]
})
export class RestaurantsModule { }
