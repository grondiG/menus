import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './store/user/user.reducer';

export interface GlobalState {
  user: fromUser.UserState;
}

export const initialAppState: GlobalState = {
  user: fromUser.initialState,
};

export const appReducers: ActionReducerMap<GlobalState> = {
  user: fromUser.reducer,
}
