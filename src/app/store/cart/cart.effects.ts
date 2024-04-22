import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as cartActions from './cart.actions';
import { CartItem } from '../../core/models';
import { CART_STORAGE, CartStorage } from '../../app.config';


@Injectable()
export class CartEffects {
  private actions$: Actions = inject(Actions);
  private cartStorage: CartStorage = inject(CART_STORAGE);

  init$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.cartInit),
    map(() => {
      return cartActions.getItemsFromLocalStorage()
    })
  ));

  getItemsFromLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.getItemsFromLocalStorage),
    map(() => {
      return cartActions.setCartItems({ items: this.cartStorage.getItems() });
    })
  ));

  addItemToLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.addToCart),
    map((action: { item: CartItem }) => {
      this.cartStorage.addItem(action.item);
      return cartActions.addToCart({ item: action.item });
    })
  ), { dispatch: false });

  clearCart$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.clearCart),
    map(() => {
      this.cartStorage.clearCart();
      return cartActions.clearCart();
    })
  ), { dispatch: false });

  removeItemFromLocalStorage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(cartActions.removeFromCart),
    map((action: { name: string }) => {
      this.cartStorage.removeItem(action.name);
      return cartActions.removeFromCart({ name: action.name });
    })
  ), { dispatch: false });

}
