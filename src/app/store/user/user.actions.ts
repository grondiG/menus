import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserState } from './user.reducer';
import { RegisterData } from '../../core/models/register-data';
import { LoginData } from '../../core/models/login-data';

export enum UserActionTypes {
  Register = '[User] Register',
  LoadUser = '[User] Load Profile',
  LoadUserSuccess = '[User] Load Profile Success',
  LoadUserFail = '[User] Load Profile Fail',
  Logout = '[User] Logout',
  AddTokenToLocalStorage = '[User] Add Token To Local Storage',
  NavigateToProfile = '[User] Navigate To Profile'
}

export const register = createAction(UserActionTypes.Register, props<{ data: RegisterData }>());
export const loadUser = createAction(UserActionTypes.LoadUser, props<{ data: LoginData }>());
export const loadUserSuccess = createAction(UserActionTypes.LoadUserSuccess, props<{ response: UserState }>());
export const loadUserError = createAction(UserActionTypes.LoadUserFail, props<{ error: HttpErrorResponse }>());
export const logout = createAction(UserActionTypes.Logout);
export const addTokenToLocalStorage = createAction(UserActionTypes.AddTokenToLocalStorage, props<{ response: UserState }>());
export const navigateToProfile = createAction(UserActionTypes.NavigateToProfile);
// export const profileApiActions = createActionGroup({
//   source: '[User]',
//   events: {
//     'Register': props<{ data: RegisterData }>(),
//     'Logout': emptyProps(),
//   }
// });
