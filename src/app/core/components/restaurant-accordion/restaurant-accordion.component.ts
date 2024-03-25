import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/order';
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
    NgForOf,
    FormsModule
  ]
})
export class RestaurantAccordionComponent {
  @Input() dish: MenuItem;
  @Output() addItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  quantity: number = 1;

  orderItem(item: MenuItem): void {
    if (this.quantity <= 0) {
      return;
    }

    this.addItem.emit({
      item,
      quantity: this.quantity
    });
  }
}
