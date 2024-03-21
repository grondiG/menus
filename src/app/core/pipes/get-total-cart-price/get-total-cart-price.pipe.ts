import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../../models/order';

@Pipe({
  name: 'getTotalCartPrice',
})
export class GetTotalCartPricePipe implements PipeTransform {

  transform(cart: CartItem[]): number {
    if(!cart) {
      return 0;
    }
    return cart.reduce((acc: number, item: CartItem) => acc + parseFloat(item.item.price.replace(/\D/g, "")) * item.quantity, 0);
  }

}
