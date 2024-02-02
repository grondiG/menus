import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './store/user/user.reducer';
import * as fromProfile from './store/user/user.reducer';

export interface GlobalState {
  user: fromUser.UserState;
  profile: fromProfile.UserState;
}

export const initialAppState: GlobalState = {
  user: fromUser.initialState,
  profile: fromProfile.initialState,
};

export const appReducers: ActionReducerMap<GlobalState> = {
  user: fromUser.reducer,
  profile: fromProfile.reducer,
}
