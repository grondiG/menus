import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../core/models/order';

export enum CartActions {
    AddToCart = '[Cart] Add to cart',
    RemoveFromCart = '[Cart] Remove from cart',
    ClearCart = '[Cart] Clear cart',
}

export const addToCart = createAction(CartActions.AddToCart, props<{ item: CartItem }>());
export const removeFromCart = createAction(CartActions.RemoveFromCart, props<{ name: string }>());
export const clearCart = createAction(CartActions.ClearCart);
