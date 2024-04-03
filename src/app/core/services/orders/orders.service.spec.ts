import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { OrdersService } from './orders.service';
import DoneCallback = jest.DoneCallback;
import { OrderDto } from '../../models/order';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [OrdersService]
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrdersForUserById', () => {
    const id: string = 'mockId';

    it('should should make get request', (done: DoneCallback) => {
      const expectedResult: OrderDto[] = [{ id: 'mockId' } as OrderDto];

      service.getOrdersForUserById(id).subscribe({
        next: (result: OrderDto[]) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      });

      const request: TestRequest = httpMock.expectOne('/api/orders?userId=' + id);

      expect(request.request.method).toEqual('GET');

      request.flush([{ id: 'mockId' } as OrderDto]);
    });
  });
});
