import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderShippingData } from '../../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http: HttpClient = inject(HttpClient);

  //TODO add type to response
  //TODO create feature store for orders
  order(data: OrderShippingData): Observable<any> {
    return this.http.post('/order', {
      items: data.cart,
      shipping: data.shipping,
      totalPrice: data.totalPrice
    })
  }
}
