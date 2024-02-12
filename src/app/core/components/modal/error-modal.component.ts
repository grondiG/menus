import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent{
  @Input() error: HttpErrorResponse | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  //TODO remove
  ngAfterViewInit() {
    console.log('ErrorModalComponent initialized');
    console.log(this.error);
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
