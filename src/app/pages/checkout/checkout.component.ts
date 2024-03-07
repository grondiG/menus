import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartSelector } from '../../store/cart/cart.reducer';
import { CartItem, OrderData, ShippingForm } from '../../core/models/order';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutComponent {
  private store: Store = inject(Store);
  cartItems$: Observable<CartItem[]> = this.store.select(cartSelector);
  shippingValue: ShippingForm = {
    name: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  };

  order(data: OrderData, form: NgForm): void {
    if(form.invalid){
      return;
    }
    console.log('Order', {
      items: data.cart,
      shipping: this.shippingValue,
      totalPrice: data.totalPrice
    });
  }
}
