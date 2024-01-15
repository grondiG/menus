import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeMap} from "rxjs";
import {RestaurantsService} from "../../../core/services/restaurants/restaurants.service";
import {Restaurant} from "../../../core/models/restaurant.model";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantComponent {
  public restaurant!: Restaurant;


  constructor(private route:ActivatedRoute,
              private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.route.params.pipe(mergeMap(params => {
      return this.restaurantsService.getRestaurant(params['id']);
    })).subscribe((restaurant: Restaurant) => {
      this.restaurant = restaurant
    });
  }

}
