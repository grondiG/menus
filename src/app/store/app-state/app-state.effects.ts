import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appStateActions from './app-state.actions';
import { ModalService } from '../../core/services/modal/modal.service';

@Injectable()
export class AppStateEffects {
  private actions$: Actions = inject(Actions);
  private modalService: ModalService = inject(ModalService);

  setError$ = createEffect(() => this.actions$.pipe(
    ofType(appStateActions.setError),
    tap((action) => {
      this.modalService.createModal(action.error);
    })
  ), { dispatch: false });
}
