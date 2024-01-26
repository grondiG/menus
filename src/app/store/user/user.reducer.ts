import { createFeature, createReducer } from '@ngrx/store';

export interface UserState {
  user: any|null;
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
