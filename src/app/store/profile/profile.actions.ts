import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileState } from './profile.reducer';
import { RegisterData } from '../../core/models/register-data';
import { LoginData } from '../../core/models/login-data';

export enum ProfileActionTypes {
  Register = '[Profile] Register',
  LoadProfile = '[Profile] Load Profile',
  LoadProfileSuccess = '[Profile] Load Profile Success',
  LoadProfileFail = '[Profile] Load Profile Fail',
  Logout = '[Profile] Logout',
  AddTokenToLocalStorage = '[Profile] Add Token To Local Storage',
}

export const register = createAction(ProfileActionTypes.Register, props<{ data: RegisterData }>());
export const loadProfile = createAction(ProfileActionTypes.LoadProfile, props<{ data: LoginData }>());
export const loadProfileSuccess = createAction(ProfileActionTypes.LoadProfileSuccess, props<{ response: ProfileState }>());
export const loadProfileError = createAction(ProfileActionTypes.LoadProfileFail, props<{ error: HttpErrorResponse }>());
export const logout = createAction(ProfileActionTypes.Logout);
export const addTokenToLocalStorage = createAction(ProfileActionTypes.AddTokenToLocalStorage, props<{ response: ProfileState }>());

// export const profileApiActions = createActionGroup({
//   source: '[Profile]',
//   events: {
//     'Register': props<{ data: RegisterData }>(),
//     'Logout': emptyProps(),
//   }
// });
