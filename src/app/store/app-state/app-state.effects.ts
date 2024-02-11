import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appStateActions from './app-state.actions';
import { tap } from 'rxjs';
import { ModalService } from '../../core/services/modal/modal.service';


@Injectable()
export class AppStateEffects {
  private actions$: Actions = inject(Actions);
  private modalService: ModalService = inject(ModalService);

  setError$ = createEffect(() => this.actions$.pipe(
    ofType(appStateActions.setError),
    tap(() => {
      this.modalService.openModal();
    })
  ), { dispatch: false });

  clearError$ = createEffect(() => this.actions$.pipe(
    ofType(appStateActions.clearError),
    tap(() => {
      this.modalService.closeModal();
    })
  ), { dispatch: false });
}
