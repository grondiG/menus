import { TestBed } from '@angular/core/testing';

import { RestaurantsService } from './restaurants.service';
import { HttpClient } from '@angular/common/http';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: {}}]
    });
    service = TestBed.inject(RestaurantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
