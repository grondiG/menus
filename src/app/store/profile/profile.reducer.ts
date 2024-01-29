import {createFeature, createReducer, on} from "@ngrx/store";
import { loadProfile, loadProfileSuccess, logout, register } from "./profile.actions";

export interface ProfileState {
  loading: boolean;
  data: any;
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
    on(loadProfile, (state) => ({ ...state, loading: true })),
    on(loadProfileSuccess, (state, { payload }) => ({ ...state, ...payload })),
    on(logout, (state) => ({ ...state, data: null, isLogged: false, token: null })),
    on(register, (state) => ({ ...state, loading: true })),
  ),
});
