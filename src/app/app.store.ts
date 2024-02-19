import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './store/user/user.reducer';
import * as fromAppState from './store/app-state/app-state.reducer';
import * as fromCart from './store/cart/cart.reducer';

export interface GlobalState {
  user: fromUser.UserState;
  appState: fromAppState.appState;
  cart: fromCart.CartState;
}

export const initialAppState: GlobalState = {
  user: fromUser.initialState,
  appState: fromAppState.initialState,
  cart: fromCart.initialState
};

export const appReducers: ActionReducerMap<GlobalState> = {
  user: fromUser.reducer,
  appState: fromAppState.appReducer,
  cart: fromCart.reducer
}

