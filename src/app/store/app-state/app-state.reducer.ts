import { HttpErrorResponse } from '@angular/common/http';
import { Action, ActionReducer, createReducer, createSelector, on } from '@ngrx/store';
import { clearError, setError } from './app-state.actions';

export interface appState {
  error: HttpErrorResponse | null;
}

export const initialState: appState = {
  error: null
};

export const appReducer: ActionReducer<appState, Action> = createReducer(
  initialState,
  on(setError, (state, { error }) => ({ ...state, error })),
  on(clearError, (state) => ({ ...state, error: null }))
);

const appStateSelector = (state: { appState: appState }) => state.appState;

export const appStateError = createSelector(
  appStateSelector,
  (state: appState) => state?.hasOwnProperty('error') ? state.error : null
);
