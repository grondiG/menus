import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { appStateError } from '../../../store/app-state/app-state.reducer';
import { clearError } from '../../../store/app-state/app-state.actions';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent {
  private modalService: ModalService = inject(ModalService);
  private store: Store = inject(Store);

  isModalOpen$: Observable<boolean> = this.modalService.isModalOpen$;
  error$: Observable<HttpErrorResponse | null> = this.store.select(appStateError);

  closeModal(): void {
    this.store.dispatch(clearError());
  }
}
