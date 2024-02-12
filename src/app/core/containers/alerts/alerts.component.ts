import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsComponent implements AfterViewInit{
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef;
  private modalService: ModalService = inject(ModalService);

  ngAfterViewInit() {
    this.modalService.setAlertViewContainerRef(this.modalContainer);
  }
}
