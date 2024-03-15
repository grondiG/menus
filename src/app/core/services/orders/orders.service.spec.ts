import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
