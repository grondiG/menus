import { inject, Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Restaurant } from "../../core/models/restaurant.model";
import { exhaustMap, Observable, switchMap } from "rxjs";
import { RestaurantsService } from "../../core/services/restaurants/restaurants.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

export interface RestaurantsState {
  restaurants: Restaurant[];
  restaurant: Restaurant | null;
}

const defaultState: RestaurantsState = {
  restaurants: [],
  restaurant: null
};

@Injectable()
export class RestaurantsStore extends ComponentStore<RestaurantsState> {
  private restaurantsService: RestaurantsService = inject(RestaurantsService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    super(defaultState);
  }

  readonly restaurants$: Observable<Restaurant[]> = this.select(state => state.restaurants);
  readonly restaurant$: Observable<Restaurant> = this.select(state => state.restaurant);

  readonly setRestaurants = this.updater((state, restaurants: Restaurant[]) => {
    return {
      ...state,
      restaurants
    };
  });

  readonly setRestaurant = this.updater((state, restaurant: Restaurant) => {
    return {
      ...state,
      restaurant
    };
  });

  readonly loadRestaurants = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => this.restaurantsService.getRestaurants().pipe(
        tapResponse({
          next: (restaurants: Restaurant[]) => this.setRestaurants(restaurants),
          error: (error: HttpErrorResponse) => this.logError(error),
        })
      ))
    ),
  );

  readonly loadRestaurant = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => this.restaurantsService.getRestaurant(this.route.snapshot.params['id']).pipe(
        tapResponse({
          next: (restaurant: Restaurant) => this.setRestaurant(restaurant),
          error: (error: HttpErrorResponse) => this.logError(error),
        })
      ))
    ),
  );

  readonly searchRestaurants = this.effect<string>((searchValue$) =>
    searchValue$.pipe(
      switchMap((searchValue) => this.restaurantsService.searchRestaurants(searchValue).pipe(
        tapResponse({
          next: (restaurants: Restaurant[]) => this.setRestaurants(restaurants),
          error: (error: HttpErrorResponse) => this.logError(error),
        })
      ))
    )
  );

  private logError(error: HttpErrorResponse): void {
    console.log(error);
  }
}
