import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { cartSelector } from '../../store/cart/cart.reducer';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, lastValueFrom, map, Observable } from 'rxjs';
import { CartItem } from '../models/order';

export const emptyCartGuard: CanActivateFn = (): Observable<UrlTree|boolean> => {
  const returnToHome: UrlTree = inject(Router).createUrlTree(['/home']);
  const store: Store = inject(Store);

  return store.select(cartSelector).pipe(
    map((cart: CartItem[]): boolean|UrlTree => cart.length === 0 ? returnToHome : true),
  );

  // try{
  //   await lastValueFrom(store.select(cartSelector).pipe(
  //     map((cart: CartItem[]): boolean|UrlTree => {
  //       if(cart.length === 0){
  //         throw new Error('Cart is empty');
  //       }
  //       return true;
  //     }),
  //     first()
  //   ));
  //   return true;
  // } catch (error) {
  //   return returnToHome;
  // }
};
