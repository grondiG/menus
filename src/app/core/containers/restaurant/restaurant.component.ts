import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeMap} from "rxjs";
import {RestaurantsService} from "../../services/restaurants/restaurants.service";
import {Restaurant} from "../../models/restaurant.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private restaurantsService: RestaurantsService = inject(RestaurantsService);

  restaurant!: Restaurant;


  ngOnInit(): void {
    this.route.params.pipe(mergeMap(params => {
      return this.restaurantsService.getRestaurant(params['id']);
    }))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((restaurant: Restaurant) => {
      this.restaurant = restaurant;
    });
  }
}
