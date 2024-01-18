import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RestaurantsComponent} from "../../pages/restaurants/restaurants.component";
import {RestaurantsRoutingModule} from "./restaurants.routing.module";
import { RestaurantComponent } from '../../core/containers/restaurant/restaurant.component';
import {CoreModule} from "../../core/core.module";



@NgModule({
  declarations: [
    RestaurantsComponent,
    RestaurantComponent
  ],
    imports: [
        SharedModule,
        RestaurantsRoutingModule,
        CoreModule,
    ]
})
export class RestaurantsModule { }
