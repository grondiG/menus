import { createFeature, createReducer } from '@ngrx/store';

export interface ProfileState {
  loading: boolean;
}

export const initialState: ProfileState = {
  loading: false,
};

const featureSelectorKey: string = 'profile' as const;

export const profileFeature = createFeature({
  name: featureSelectorKey,
  reducer: createReducer(
    initialState,
  ),
});
