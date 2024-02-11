import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './store/user/user.reducer';
import * as fromAppState from './store/app-state/app-state.reducer';

export interface GlobalState {
  user: fromUser.UserState;
  appState: fromAppState.appState;
}

export const initialAppState: GlobalState = {
  user: fromUser.initialState,
  appState: fromAppState.initialState
};

export const appReducers: ActionReducerMap<GlobalState> = {
  user: fromUser.reducer,
  appState: fromAppState.appReducer
}
