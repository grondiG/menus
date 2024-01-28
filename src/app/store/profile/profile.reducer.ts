import {createFeature, createReducer, on} from "@ngrx/store";
import {loadProfile, logout, register} from "./profile.actions";

export interface ProfileState {
  loading: boolean;
  error: boolean;
  data: any;
}

export const initialState: ProfileState = {
  loading: false,
  error: false,
  data: null,
};

export const profileFeatureKey = "profile" as const;

export const profileFeature = createFeature({
  name: profileFeatureKey,
  reducer: createReducer(
    initialState,
    on(loadProfile, (state) => ({ ...state, loading: true })),
    on(logout, (state) => ({ ...state, data: null })),
    on(register, (state) => ({ ...state, loading: true })),
  ),
});
