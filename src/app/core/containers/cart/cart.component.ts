import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeFromCart } from '../../../store/cart/cart.actions';
import { cartSelector } from '../../../store/cart/cart.reducer';
import { CartItem } from '../../models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  private store: Store = inject(Store);

  @Input() isCartOpen: boolean;

  cart$: Observable<CartItem[]> = this.store.select(cartSelector);

  removeFromCart(item: CartItem): void {
    this.store.dispatch(removeFromCart({name: item.item.name}));
  }
}
