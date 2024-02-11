import { createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum AppStateActionTypes {
    SetError = '[Error] Set Error',
    ClearError = '[Error] Clear Error'
}


export const setError = createAction(AppStateActionTypes.SetError, (error: HttpErrorResponse) => ({ error }));
export const clearError = createAction(AppStateActionTypes.ClearError);
