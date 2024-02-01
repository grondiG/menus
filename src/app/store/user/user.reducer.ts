import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { User } from '../../core/models/user';

export interface UserState {
  user: User|null;
}

export const initialState: UserState = {
  user: null,
};

export const featureSelectorKey = 'user';

const userReducer = createReducer(
  initialState
);

export const userFeature = createFeature({
  name: featureSelectorKey,
  reducer: userReducer
});

export const {
  name,
  reducer,
  selectUser,
} = userFeature;

export const isUserLogged = createSelector(selectUser, (user: User|null) => !!user);
