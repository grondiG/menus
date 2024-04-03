import { TestBed } from '@angular/core/testing';

import { RestaurantsService } from './restaurants.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Restaurant } from '../../models/restaurant.model';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantsService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(RestaurantsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRestaurants', () => {
    it('should make get request', () => {
      const expectedResult: Restaurant[] = [{ name: 'restaurant1' }, { name: 'restaurant2' }] as Restaurant[];

      service.getRestaurants().subscribe({
        next: (result: Restaurant[]) => {
          expect(result).toEqual(expectedResult);
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/restaurants');
      expect(request.request.method).toEqual('GET');
      request.flush([{ name: 'restaurant1' }, { name: 'restaurant2' }] as Restaurant[]);
    });
  });

  describe('getRestaurant', () => {
    it('should make get request', () => {
      const expectedResult: Restaurant = { name: 'restaurant1' } as Restaurant;
      const id: string = '1';
      service.getRestaurant(id).subscribe({
        next: (result: Restaurant) => {
          expect(result).toEqual(expectedResult);
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/restaurants/1');
      expect(request.request.method).toEqual('GET');
      request.flush({ name: 'restaurant1' } as Restaurant);
    });
  });

  describe('searchRestaurants', () => {
    it('should make get request', () => {
      const expectedResult: Restaurant[] = [{ name: 'restaurant1' }, { name: 'restaurant2' }] as Restaurant[];
      const query: string = 'restaurant';
      service.searchRestaurants(query).subscribe({
        next: (result: Restaurant[]) => {
          expect(result).toEqual(expectedResult);
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/filterRestaurants?name=restaurant');
      expect(request.request.method).toEqual('GET');
      request.flush([{ name: 'restaurant1' }, { name: 'restaurant2' }] as Restaurant[]);
    });
  });
});
