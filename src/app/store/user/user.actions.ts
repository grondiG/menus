import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginData, RegisterData, ResponseDataDto } from '../../core/models/authentication';

export enum UserActionTypes {
  CheckToken = '[User] Check Token',
  CheckTokenSuccess = '[User] Check Token Success',
  CheckTokenFail = '[User] Check Token Fail',
  LoadUser = '[User] Load Profile',
  LoadUserSuccess = '[User] Load Profile Success',
  LoadUserFail = '[User] Load Profile Fail',
  Register = '[User] Register',
  RegisterSuccess = '[User] Register Success',
  RegisterFail = '[User] Register Fail',
  Logout = '[User] Logout',
  AddTokenToLocalStorage = '[User] Add Token To Local Storage',
  NavigateToProfile = '[User] Navigate To Profile'
}
export const checkToken = createAction(UserActionTypes.CheckToken);
export const checkTokenSuccess = createAction(UserActionTypes.CheckTokenSuccess, props<{ response: ResponseDataDto }>());
export const checkTokenFail = createAction(UserActionTypes.CheckTokenFail, props<{ error: HttpErrorResponse }>());
export const loadUser = createAction(UserActionTypes.LoadUser, props<{ data: LoginData }>());
export const loadUserSuccess = createAction(UserActionTypes.LoadUserSuccess, props<{ response: ResponseDataDto }>());
export const loadUserFail = createAction(UserActionTypes.LoadUserFail, props<{ error: HttpErrorResponse }>());
export const register = createAction(UserActionTypes.Register, props<{ data: RegisterData }>());
export const registerSuccess = createAction(UserActionTypes.RegisterSuccess, props<{ response: ResponseDataDto }>());
export const registerFail = createAction(UserActionTypes.RegisterFail, props<{ error: HttpErrorResponse }>());
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
