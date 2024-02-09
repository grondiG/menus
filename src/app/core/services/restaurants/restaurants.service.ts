import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private http: HttpClient = inject(HttpClient);

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/api/restaurants');
  }

  getRestaurant(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>('/api/restaurants/' + id);
  }

  searchRestaurants(query: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/api/filterRestaurants?name=' + query);
  }
}
