import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeMap} from "rxjs";
import {RestaurantsService} from "../../../core/services/restaurants/restaurants.service";
import {Restaurant} from "../../../core/models/restaurant.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantComponent {
  private destroyRef = inject(DestroyRef);
  public restaurant!: Restaurant;

  constructor(private route:ActivatedRoute,
              private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.route.params.pipe(mergeMap(params => {
      return this.restaurantsService.getRestaurant(params['id']);
    }))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((restaurant: Restaurant) => {
      this.restaurant = restaurant
    });
  }

}
