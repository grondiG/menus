import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Restaurant} from "../../../core/models/restaurant.model";

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
}
