import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartItem, OrderData, OrderDto, ShippingForm } from '../../core/models/order';
import { cartSelector } from '../../store/cart/cart.reducer';
import * as fromOrders from '../../store/order/order.actions';
import { orderLoadingSelector } from '../../store/order/order.reducer';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutComponent {
  private store: Store = inject(Store);
  cartItems$: Observable<CartItem[]> = this.store.select(cartSelector);
  isLoading$: Observable<boolean> = this.store.select(orderLoadingSelector);

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

    const order: OrderDto = {
      cart: data.cart,
      shipping: this.shippingValue,
      totalPrice: data.totalPrice
    };
    this.store.dispatch(fromOrders.addOrder({ order }));
  }
}
