import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MenuItem} from "../../models/restaurant.model";

@Component({
  selector: 'app-restaurant-accordion',
  templateUrl: './restaurant-accordion.component.html',
  styleUrl: './restaurant-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantAccordionComponent {
  @Input() menu: MenuItem[];

}
