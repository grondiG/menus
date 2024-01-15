import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { RestaurantsService } from '../../core/services/restaurants/restaurants.service';
import {Restaurant} from "../../core/models/restaurant.model";
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantsComponent {
  public restaurants: Restaurant[] = [];
  public searchValue: FormControl = new FormControl('');

  constructor(private restaurantsService: RestaurantsService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.cdr.markForCheck();
    });
  }

  public onSearch(): void {

    const searchValue = this.searchValue.value;
    this.restaurantsService.searchRestaurants(searchValue).subscribe((restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
      this.cdr.markForCheck();
    });
  }

  public resetSearch(): void {
    this.searchValue.setValue('');
    this.onSearch();
  }

  protected readonly alert = alert;
}
