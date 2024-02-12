import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ErrorModalComponent } from '../../components/modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private alertViewContainer: ViewContainerRef;
  private componentSubscriber!: Subject<string>;
  private componentRef!: ComponentRef<ErrorModalComponent>;

  setAlertViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.alertViewContainer = viewContainerRef;
  }

  createModal(error: HttpErrorResponse): void {
    this.componentRef = this.alertViewContainer.createComponent(ErrorModalComponent);
    this.componentRef.instance.error = error;
    this.componentRef.instance.closeModal.subscribe(() => { this.closeModal(); });
    this.componentSubscriber = new Subject<string>();
  }


  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}
