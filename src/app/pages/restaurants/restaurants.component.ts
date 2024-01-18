import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import { RestaurantsService } from '../../core/services/restaurants/restaurants.service';
import {Restaurant} from "../../core/models/restaurant.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantsComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private restaurantsService: RestaurantsService = inject(RestaurantsService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  restaurants: Restaurant[] = [];
  searchValue: string = '';


  ngOnInit(): void {
    this.restaurantsService.getRestaurants()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.cdr.markForCheck();
    });
  }

  onSearch(): void {
    this.restaurantsService.searchRestaurants(this.searchValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.cdr.markForCheck();
    });
  }

  resetSearch(): void {
    this.searchValue = '';
    this.onSearch();
  }
}
