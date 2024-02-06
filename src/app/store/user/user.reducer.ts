import { createFeature, createReducer, on } from '@ngrx/store'
import * as userActions from './user.actions';
import { UserUtils } from './user.utils';
import { UserData } from '../../core/models/login-data';

export interface UserState {
  loading: boolean;
  data: UserData;
  isLogged: boolean;
  token: string;
}

export const initialState: UserState = {
  loading: false,
  data: null,
  isLogged: false,
  token: null,
};

export const userFeatureKey: "user" = "user" as const;

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    on(userActions.loadUser, (state) => ({ ...state, loading: true, isLogged: false })),
    on(
      userActions.loadUserSuccess,
      userActions.checkTokenSuccess,
      (state, action) => ({
        ...state,
        isLogged: true,
        loading: false,
        data: UserUtils.mapUserDataDtoToUserData(action.response.data),
        token: action.response.token
      })
    ),
    on(userActions.loadUserFail, (state) => ({ ...state, loading: false, isLogged: false })),
    on(
      userActions.logout,
      userActions.checkTokenFail,
      (state) => ({ ...state, data: null, isLogged: false, token: null })
    ),
    on(userActions.register, (state) => ({ ...state, loading: true })),
  ),
});


export const {
  name,
  reducer,
} = userFeature;
