import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../store/cart/cart.actions';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantsStore } from '../../../pages/restaurants/restaurants.store';
import { CartItem } from '../../models/order';
import { CoreModule } from '../../core.module';
import {
  RestaurantAccordionComponent
} from '../../components/restaurant-accordion/restaurant-accordion.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RestaurantsStore],
  standalone: true,
  imports: [ AsyncPipe, CoreModule, RestaurantAccordionComponent, NgIf, NgForOf ]
})
export class RestaurantComponent {
  private restaurantsStore: RestaurantsStore = inject(RestaurantsStore);
  private store: Store = inject(Store);

  restaurant$: Observable<Restaurant> = this.restaurantsStore.restaurant$;

  constructor() {
    this.restaurantsStore.loadRestaurant();
  }

  addToCart(item: CartItem): void {
    this.store.dispatch(addToCart({ item }));
  }
}
