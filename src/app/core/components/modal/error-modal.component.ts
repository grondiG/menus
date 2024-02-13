import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromApp from '../../../store/app-state/app-state.reducer';
import * as appActions from '../../../store/app-state/app-state.actions';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent {
  private store: Store = inject(Store);

  error$: Observable<HttpErrorResponse | null> = this.store.select(fromApp.appStateError);

  closeModal(): void {
    this.store.dispatch(appActions.clearError());
  }
}
