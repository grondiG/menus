import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { orderDataSelector } from '../../store/order/order.reducer';
import { OrderDto } from '../../core/models/order';
import { OrderListComponent } from '../../core/components/order-list/order-list.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgIf,
    OrderListComponent
  ],
  standalone: true
})
export class OrdersComponent{
  private store: Store = inject(Store);
  orders$: Observable<OrderDto[]> = this.store.select(orderDataSelector);
}
