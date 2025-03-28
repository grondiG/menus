import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store'
import { UserData } from '../../core/models';
import * as userActions from './user.actions';
import { UserUtils } from './user.utils';

export interface UserState {
  loading: boolean;
  data: UserData;
  isLogged: boolean;
  token: string;
  isAdmin: boolean;
}

export const initialState: UserState = {
  loading: false,
  data: null,
  isLogged: false,
  token: null,
  isAdmin: false
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
        token: action.response.token,
        isAdmin: action.response.data.login == "admin"
      })
    ),
    on(userActions.loadUserFail,
      userActions.registerFail,
      (state) => ({
        ...state, loading: false, isLogged: false
      })
    ),
    on(
      userActions.logout,
      userActions.checkTokenFail,
      (state) => ({ ...state, data: null, isLogged: false, token: null })
    ),
  ),
});

const userFeatureSelector = createFeatureSelector<UserState>(userFeatureKey);

export const userSelector = createSelector(
  userFeatureSelector,
  (state) => state
);

export const userIsAdminSelector = createSelector(
  userFeatureSelector,
  (state) => state?.isAdmin
);

export const getUserId = createSelector(
  userFeatureSelector,
  (state) => state?.data?.id || null //important
);

export const userIsLoggedSelector = createSelector(
  userFeatureSelector,
  (state) => !!state?.isLogged //it will be always true or false
);

export const userIsLoadingSelector = createSelector(
  userFeatureSelector,
  (state) => !!state?.loading
);



export const {
  name,
  reducer,
} = userFeature;
