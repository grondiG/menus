import { createFeatureSelector, createSelector } from "@ngrx/store";
import { profileFeatureKey, ProfileState } from "./profile.reducer";

const profileFeatureSelector = createFeatureSelector<ProfileState>(profileFeatureKey);

export const profileSelector = createSelector(
  profileFeatureSelector,
  (state) => state
);

export const profileIsLoggedSelector = createSelector(
  profileFeatureSelector,
  (state) => !!state?.isLogged
);
