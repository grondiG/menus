import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from "rxjs";
import { Restaurant } from "../../models/restaurant.model";
import { RestaurantsStore } from "../../../pages/restaurants/restaurants.store";
import { AsyncPipe, NgIf } from "@angular/common";
import { CoreModule } from "../../core.module";
import {
  RestaurantAccordionComponent
} from "../../components/restaurant-accordion/restaurant-accordion.component";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RestaurantsStore],
  standalone: true,
  imports: [AsyncPipe, CoreModule, RestaurantAccordionComponent, NgIf]
})
export class RestaurantComponent {
  private restaurantsStore: RestaurantsStore = inject(RestaurantsStore);

  restaurant$: Observable<Restaurant> = this.restaurantsStore.restaurant$;

  constructor() {
    this.restaurantsStore.loadRestaurant();
  }
}
