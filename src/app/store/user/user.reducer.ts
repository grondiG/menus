import { createFeature, createReducer, on } from '@ngrx/store'
import * as userActions from './user.actions';
import { UserUtils } from './user.utils';
import { UserData } from '../../core/models/login-data';
import { HttpErrorResponse } from "@angular/common/http";

export interface UserState {
  loading: boolean;
  data: UserData;
  isLogged: boolean;
  token: string;
  error: HttpErrorResponse;
}

export const initialState: UserState = {
  loading: false,
  data: null,
  isLogged: false,
  token: null,
  error: null
};

export const userFeatureKey: "user" = "user" as const;

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    on(
      userActions.loadUser,
      userActions.register,
      (state) => ({
        ...state, loading: true, isLogged: false
      })),
    on(
      userActions.loadUserSuccess,
      userActions.registerSuccess,
      userActions.checkTokenSuccess,
      (state, action) => ({
        ...state,
        isLogged: true,
        loading: false,
        data: UserUtils.mapUserDataDtoToUserData(action.response.data),
        token: action.response.token
      })
    ),
    on(userActions.loadUserFail,
      userActions.registerFail,
      (state, action) => ({
        ...state, loading: false, isLogged: false, error: action.error
      })
    ),
    on(
      userActions.logout,
      userActions.checkTokenFail,
      (state) => ({ ...state, data: null, isLogged: false, token: null })
    ),
  ),
});


export const {
  name,
  reducer,
} = userFeature;
