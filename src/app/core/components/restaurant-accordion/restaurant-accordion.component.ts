import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MenuItem } from '../../models/restaurant.model';
import { ConvertToAttributeFormatPipe } from '../../pipes/convert-to-attribute-format/convert-to-attribute-format.pipe';
import { NutrituionsModalComponent } from '../nutrituions-modal/nutrituions-modal.component';

@Component({
  selector: 'app-restaurant-accordion',
  templateUrl: './restaurant-accordion.component.html',
  styleUrl: './restaurant-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ConvertToAttributeFormatPipe,
    NutrituionsModalComponent,
    NgForOf
  ]
})
export class RestaurantAccordionComponent {
  @Input() menu: MenuItem[];

}
