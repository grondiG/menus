import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterData } from '../../core/models/register-data';
import { LoginData, ResponseDataDto } from '../../core/models/login-data';

export enum UserActionTypes {
  Register = '[User] Register',
  CheckToken = '[User] Check Token',
  CheckTokenSuccess = '[User] Check Token Success',
  CheckTokenFail = '[User] Check Token Fail',
  LoadUser = '[User] Load Profile',
  LoadUserSuccess = '[User] Load Profile Success',
  LoadUserFail = '[User] Load Profile Fail',
  Logout = '[User] Logout',
  AddTokenToLocalStorage = '[User] Add Token To Local Storage',
  NavigateToProfile = '[User] Navigate To Profile'
}

export const register = createAction(UserActionTypes.Register, props<{ data: RegisterData }>());
export const loadUser = createAction(UserActionTypes.LoadUser, props<{ data: LoginData }>());
export const checkToken = createAction(UserActionTypes.CheckToken);
export const checkTokenSuccess = createAction(UserActionTypes.CheckTokenSuccess, props<{ response: ResponseDataDto }>());
export const checkTokenFail = createAction(UserActionTypes.CheckTokenFail, props<{ error: HttpErrorResponse }>());
export const loadUserSuccess = createAction(UserActionTypes.LoadUserSuccess, props<{ response: ResponseDataDto }>());
export const loadUserFail = createAction(UserActionTypes.LoadUserFail, props<{ error: HttpErrorResponse }>());
export const logout = createAction(UserActionTypes.Logout);
export const addTokenToLocalStorage = createAction(UserActionTypes.AddTokenToLocalStorage, props<{ response: ResponseDataDto }>());
export const navigateToProfile = createAction(UserActionTypes.NavigateToProfile);
// export const profileApiActions = createActionGroup({
//   source: '[User]',
//   events: {
//     'Register': props<{ data: RegisterData }>(),
//     'Logout': emptyProps(),
//   }
// });
