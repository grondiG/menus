import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { cartSelector } from '../../store/cart/cart.reducer';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, first, lastValueFrom, map, Observable } from 'rxjs';
import { CartItem } from '../models/order';
import { UserService } from '../services/profile/user.service';

export const emptyCartGuard: CanActivateFn = async () => {
  const navigation: UrlTree = inject(Router).createUrlTree(['/home']);
  const store: Store = inject(Store);

  try{
    await lastValueFrom(store.select(cartSelector).pipe(
      map((cart: CartItem[]): boolean => {
        if(cart.length === 0){
          throw new Error('Cart is empty');
        }
        return true;
      }),
      first()
    ));
    return true;
  } catch (error) {
    return navigation;
  }
};
