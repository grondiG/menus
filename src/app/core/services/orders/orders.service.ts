import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDto } from '../../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http: HttpClient = inject(HttpClient);

  //TODO add type to response
  //TODO create feature store for orders
  order(data: OrderDto): Observable<any> {
    return this.http.post('/api/order', {
      items: data.cart,
      shipping: data.shipping,
      totalPrice: data.totalPrice
    })
  }
}
