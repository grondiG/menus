import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http: HttpClient = inject(HttpClient);

  order(data: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>('/api/order', { ...data })
  }

  getOrdersForUserById(id: string): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>('/api/orders?userId=' + id);
  }
}
