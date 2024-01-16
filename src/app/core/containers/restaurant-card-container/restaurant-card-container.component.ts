import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Restaurant} from "../../models/restaurant.model";

@Component({
  selector: 'app-restaurant-card-container',
  templateUrl: './restaurant-card-container.component.html',
  styleUrl: './restaurant-card-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCardContainerComponent {
  @Input() restaurants!: Restaurant[];

}
