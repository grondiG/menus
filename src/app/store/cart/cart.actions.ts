import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../core/models';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

export enum CartActions {
    CartInit = ROOT_EFFECTS_INIT,
    AddToCart = '[Cart] Add to cart',
    RemoveFromCart = '[Cart] Remove from cart',
    ClearCart = '[Cart] Clear cart',
    GetItemsFromLocalStorage = '[Cart] Get items from local storage',
    RemoveItemFromLocalStorage = '[Cart] Remove item from local storage',
    SetCartItems = '[Cart] Set cart items'
}

export const cartInit = createAction(CartActions.CartInit);
export const addToCart = createAction(CartActions.AddToCart, props<{ item: CartItem }>());
export const removeFromCart = createAction(CartActions.RemoveFromCart, props<{ name: string }>());
export const clearCart = createAction(CartActions.ClearCart);
export const getItemsFromLocalStorage = createAction(CartActions.GetItemsFromLocalStorage);
export const removeItemFromLocalStorage = createAction(CartActions.RemoveItemFromLocalStorage, props<{ name: string }>());
export const setCartItems = createAction(CartActions.SetCartItems, props<{ items: CartItem[] }>());

