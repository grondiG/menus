import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Restaurant } from "../../models/restaurant.model";
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";

@Component({
  selector: 'app-restaurant-card-container',
  templateUrl: './restaurant-card-container.component.html',
  styleUrl: './restaurant-card-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    RestaurantCardComponent
  ]
})
export class RestaurantCardContainerComponent {
  @Input() restaurants!: Restaurant[];

}
