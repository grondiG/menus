import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartItem, OrderData, OrderDto, ShippingForm } from '../../core/models/order';
import { cartSelector } from '../../store/cart/cart.reducer';
import * as fromOrders from '../../store/order/order.actions';
import { orderDataSelector, orderLoadingSelector } from '../../store/order/order.reducer';
import { userIdSelector } from '../../store/user/user.reducer';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutComponent {
  private store: Store = inject(Store);
  private destroyRef: DestroyRef = inject(DestroyRef);
  cartItems$: Observable<CartItem[]> = this.store.select(cartSelector);
  isLoading$: Observable<boolean> = this.store.select(orderLoadingSelector);
  userId$: Observable<string> = this.store.select(userIdSelector);
  orderData$: Observable<OrderData[]> = this.store.select(orderDataSelector);

  shippingValue: ShippingForm = {
    name: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  };

  constructor() {

  }

  order(data: OrderData, form: NgForm): void {
    if(form.invalid){
      return;
    }

    this.userId$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userId: string) => {
        console.log(userId);
      if(!userId){
        return;
      }
      const order: OrderDto = {
        cart: data.cart,
        shipping: this.shippingValue,
        totalPrice: data.totalPrice,
        userId: userId
      };
      this.store.dispatch(fromOrders.addOrder({ order }));
    });
  }
}
