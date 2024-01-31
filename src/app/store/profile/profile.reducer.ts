import { createFeature, createReducer, on } from '@ngrx/store';
import { loadProfile, loadProfileSuccess, logout, register } from './profile.actions';

export interface ProfileState {
  loading: boolean;
  data: unknown;
  isLogged: boolean;
  token: string;
}

export const initialState: ProfileState = {
  loading: false,
  data: null,
  isLogged: false,
  token: null,
};

export const profileFeatureKey = "profile" as const;

export const profileFeature = createFeature({
  name: profileFeatureKey,
  reducer: createReducer(
    initialState,
    on(loadProfile, (state) => ({ ...state, loading: true, isLogged: true })),
    on(loadProfileSuccess, (state, { response }) => ({ ...state, ...response })),
    on(logout, (state) => ({ ...state, data: null, isLogged: false, token: null })),
    on(register, (state) => ({ ...state, loading: true })),
  ),
});


export const {
  name,
  reducer,
} = profileFeature;
