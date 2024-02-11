import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from './user.reducer';

const userFeatureSelector = createFeatureSelector<UserState>(userFeatureKey);

export const userSelector = createSelector(
  userFeatureSelector,
  (state) => state
);

export const userIsLoggedSelector = createSelector(
  userFeatureSelector,
  (state) => !!state?.isLogged
);

export const userIsLoadingSelector = createSelector(
  userFeatureSelector,
  (state) => state?.loading
);
