import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { AsyncPipe } from "@angular/common";
import {Observable} from "rxjs";
import {RestaurantsStore} from "./restaurants.store";
import { CoreModule } from "../../core/core.module";
import { FilterComponent } from "../../core/components/filter/filter.component";
import {
  RestaurantCardContainerComponent
} from "../../core/components/restaurant-card-container/restaurant-card-container.component";
import {Restaurant} from "../../core/models/restaurant.model";
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RestaurantsStore],
  standalone: true,
  imports: [
    FilterComponent,
    CoreModule,
    AsyncPipe,
    RestaurantCardContainerComponent
  ]
})
export class RestaurantsComponent {
  private restaurantsStore: RestaurantsStore = inject(RestaurantsStore);

  restaurants$: Observable<Restaurant[]> = this.restaurantsStore.restaurants$;
  searchValue: string = '';

  constructor() {
    this.restaurantsStore.loadRestaurants();
  }

  onSearch(): void {
    this.restaurantsStore.searchRestaurants(this.searchValue);
  }

  resetSearch(): void {
    this.searchValue = '';
    this.onSearch();
  }
}
