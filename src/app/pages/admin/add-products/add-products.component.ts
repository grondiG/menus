import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RestaurantsStore } from '../../restaurants/restaurants.store';
import { Observable } from 'rxjs';
import { Restaurant } from '../../../core/models';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductsComponent {
  private restaurantsStore: RestaurantsStore = inject(RestaurantsStore);

  restaurants$: Observable<Restaurant[]> = this.restaurantsStore.restaurants$;

  constructor() {
    this.restaurantsStore.loadRestaurants();
  }
}
