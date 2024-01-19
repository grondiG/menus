import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Restaurant} from "../../models/restaurant.model";
import { RestaurantDescriptionPipe } from "../../pipes/restaurant-description/restaurant-description.pipe";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RestaurantDescriptionPipe,
    RouterLink
  ]
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
}
