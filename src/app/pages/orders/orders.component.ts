import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderDataSelector } from '../../store/order/order.reducer';
import { Observable } from 'rxjs';
import { OrderDto } from '../../core/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent{
  private store: Store = inject(Store);
  orders$: Observable<OrderDto[]> = this.store.select(orderDataSelector);
}
