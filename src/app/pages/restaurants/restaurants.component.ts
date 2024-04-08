import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Restaurant } from '../../core/models/restaurant.model';
import { RestaurantsStore } from './restaurants.store';
import { CoreModule } from '../../core/core.module';
import {
  RestaurantCardContainerComponent
} from '../../core/components/restaurant-card-container/restaurant-card-container.component';
import { FilterComponent } from '../../core/components/filter/filter.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    FilterComponent,
    CoreModule,
    AsyncPipe,
    RestaurantCardContainerComponent
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //? tests not work with this provider
  providers: [RestaurantsStore]
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
