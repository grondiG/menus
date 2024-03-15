import { TestBed } from '@angular/core/testing';

import { RestaurantsService } from './restaurants.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(RestaurantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
