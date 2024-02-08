import { inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ApplicationEffects {
  private actions$: Actions = inject(Actions);

  errorAlerts$: Observable<Action> = createEffect(() => this.actions$.pipe(
    filter(action => action.type.endsWith('Fail')),
    tap((action) => {
      console.log(action.type);

      if ('error' in action) {
        console.log(action.error);
      }
    })
  ), { dispatch: false });
}
