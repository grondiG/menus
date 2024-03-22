import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf } from '@angular/common';
import { OrderDto } from '../../models/order';
import { CoreModule } from '../../core.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    CoreModule,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent {
  @Input() orders: OrderDto[];

}
