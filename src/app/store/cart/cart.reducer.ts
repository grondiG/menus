import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as cartActions from './cart.actions';
import { CartItem } from '../../core/models/order';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartFeatureKey: "cart" = "cart" as const;

export const cartFeature = createFeature({
  name: cartFeatureKey,
  reducer: createReducer(
    initialState,
    on(
      cartActions.addToCart,
      (state: CartState, action) => {
        const existingItemIndex = state.items.findIndex((item: CartItem) => item.item.name === action.item.item.name);
        if (existingItemIndex > -1) {
          const updatedItems: CartItem[] = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + action.item.quantity
          };
          return {
            ...state,
            items: updatedItems
          };
        }
        return {
          ...state,
          items: [
            ...state.items,
            action.item
          ]
        };
      }
    ),
    on(
      cartActions.removeFromCart,
      (state: CartState, action) => ({
        ...state,
        items: state.items.filter((item: CartItem) => item.item.name !== action.name)
      })
    ),
    on(
      cartActions.clearCart,
      (state: CartState) => ({
        ...state,
        items: []
      })
    ),
  ),
});

const cartFeatureSelector = createFeatureSelector(cartFeatureKey);

export const cartSelector = createSelector(
  cartFeatureSelector,
  (state: CartState) => state.items
);

export const {
  name,
  reducer
} = cartFeature;
