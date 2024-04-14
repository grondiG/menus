import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as cartActions from './cart.actions';
import { CartItem } from '../../core/models';


@Injectable()
export class CartEffects {
  private actions$: Actions = inject(Actions);

  init$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.cartInit),
    map(() => {
      return cartActions.getItemsFromLocalStorage()
    })
  ));

  getItemsFromLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.getItemsFromLocalStorage),
    map(() => {
      //TODO create injection token for localStorage
      const cartItems: string = localStorage.getItem('cartItems');
      const items: CartItem[] = cartItems ? JSON.parse(cartItems) : [];
      return cartActions.setCartItems({ items });
    })
  ));

  addItemToLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.addToCart),
    map((action: { item: CartItem }) => {
      const cartItems: string = localStorage.getItem('cartItems');
      const items: CartItem[] = cartItems ? JSON.parse(cartItems) : [];
      if (items.find((item: CartItem): boolean => item.item.name === action.item.item.name)) {
        items.map((item: CartItem) => {
          if (item.item.name === action.item.item.name) {
            item.quantity += action.item.quantity;
          }
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
        return cartActions.addToCart({ item: action.item });
      }
      items.push(action.item);
      localStorage.setItem('cartItems', JSON.stringify(items));
      return cartActions.addToCart({ item: action.item });
    })
  ), { dispatch: false });

  clearCart$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.clearCart),
    map(() => {
      localStorage.removeItem('cartItems');
      return cartActions.clearCart();
    })
  ), { dispatch: false });

  removeItemFromLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.removeFromCart),
    map((action: { name: string }) => {
      const cartItems: string = localStorage.getItem('cartItems');
      const items: CartItem[] = cartItems ? JSON.parse(cartItems) : [];
      const updatedItems: CartItem[] = items.filter((item: CartItem) => item.item.name !== action.name);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return cartActions.removeFromCart({ name: action.name });
    })
  ), { dispatch: false });

}
