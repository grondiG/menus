import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { interval, map, Observable, take, tap } from 'rxjs';
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
  private countToValue: number = 10;

  counter$!: Observable<number>;
  error$: Observable<HttpErrorResponse | null> = this.store.select(fromApp.appStateError).pipe(
    tap((error: HttpErrorResponse) => {
      if(error) {
        this.createCloseModalTimer()
      }
    })
  );

  createCloseModalTimer(): void {
    this.counter$ = interval(1000).pipe(
      take(this.countToValue + 1),
      map((value: number) => {
        if(value === this.countToValue) {
          this.closeModal();
        }
        return this.countToValue - value
      }),
      );
  }

  closeModal(): void {
    this.store.dispatch(appActions.clearError());
  }
}
