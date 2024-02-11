import { ComponentRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ErrorModalComponent } from '../../components/modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponent: ComponentRef<ErrorModalComponent>;
  private store: Store = inject(Store);

  isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isModalOpen$: Observable<boolean> = this.isModalOpen.asObservable();

  constructor() { }

  openModal() {
    this.isModalOpen.next(true);
  }

  closeModal() {
    this.isModalOpen.next(false);
  }
}
