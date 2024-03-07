import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../core/models/order';

export enum CartActions {
    AddToCart = '[Cart] Add to cart',
    RemoveFromCart = '[Cart] Remove from cart',
    ClearCart = '[Cart] Clear cart',
    GetItemsFromLocalStorage = '[Cart] Get items from local storage',
    RemoveItemFromLocalStorage = '[Cart] Remove item from local storage',
    SetCartItems = '[Cart] Set cart items'
}

export const addToCart = createAction(CartActions.AddToCart, props<{ item: CartItem }>());
export const removeFromCart = createAction(CartActions.RemoveFromCart, props<{ name: string }>());
export const clearCart = createAction(CartActions.ClearCart);
export const getItemsFromLocalStorage = createAction(CartActions.GetItemsFromLocalStorage);
export const removeItemFromLocalStorage = createAction(CartActions.RemoveItemFromLocalStorage, props<{ name: string }>());
export const setCartItems = createAction(CartActions.SetCartItems, props<{ items: CartItem[] }>());

