import { createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum AppStateActionTypes {
    SetError = '[Error] Set Error',
}

export const setError = createAction(AppStateActionTypes.SetError, (error: HttpErrorResponse) => ({ error }));
