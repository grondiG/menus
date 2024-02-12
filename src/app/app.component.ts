import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from './core/services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'menus';
  //TODO remove and refactor to work in alert container
  // @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef;
  // private modalService: ModalService = inject(ModalService);
  //
  // ngAfterViewInit() {
  //   this.modalService.setAlertViewContainerRef(this.modalContainer);
  // }
}
