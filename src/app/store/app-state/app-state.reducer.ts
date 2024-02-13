import { HttpErrorResponse } from '@angular/common/http';
import { Action, ActionReducer, createReducer, createSelector, on } from '@ngrx/store';
import { setError } from './app-state.actions';

export interface appState {
  error: HttpErrorResponse | null;
}

export const initialState: appState = {
  error: null
};

export const appReducer: ActionReducer<appState, Action> = createReducer(
  initialState,
  on(setError, (state, { error }) => ({ ...state, error })),
);

const appStateSelector = (state: { appState: appState }) => state.appState;

export const appStateError = createSelector(
  appStateSelector,
  (state: appState) => state.error
);
