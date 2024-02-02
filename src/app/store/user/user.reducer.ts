import { createFeature, createReducer, on } from '@ngrx/store';
import { loadUser, loadUserError, loadUserSuccess, logout, register } from './user.actions';

export interface UserState {
  loading: boolean;
  data: unknown;
  isLogged: boolean;
  token: string;
}

export const initialState: UserState = {
  loading: false,
  data: null,
  isLogged: false,
  token: null,
};

export const userFeatureKey: "user" = "user" as const;

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    on(loadUser, (state) => ({ ...state, loading: true, isLogged: false })),
    on(loadUserSuccess, (state, { response }) => ({ ...state, ...response, isLogged: true, loading: false })),
    on(loadUserError, (state) => ({ ...state, loading: false, isLogged: false })),
    on(logout, (state) => ({ ...state, data: null, isLogged: false, token: null })),
    on(register, (state) => ({ ...state, loading: true })),
  ),
});


export const {
  name,
  reducer,
} = userFeature;
