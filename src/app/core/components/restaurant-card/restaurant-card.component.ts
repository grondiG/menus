import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantDescriptionPipe } from '../../pipes/restaurant-description/restaurant-description.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RestaurantDescriptionPipe,
    RouterLink,
    TranslateModule
  ]
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
}
