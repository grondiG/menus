import { GetTotalCartPricePipe } from './get-total-cart-price.pipe';
import { TestBed } from '@angular/core/testing';
import { mockCartItems } from '../../../../mock-data/mock-data';

describe('GetTotalCartPricePipe', () => {
  let pipe: GetTotalCartPricePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GetTotalCartPricePipe] });
    pipe = TestBed.inject(GetTotalCartPricePipe);
  });

  it('create an instance', () => {
    const pipe = new GetTotalCartPricePipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return 0 if cart is null', () => {
      const result: number = pipe.transform(null);
      const expectedResult: number = 0;

      expect(result).toEqual(expectedResult);
    });

    it('should return 0 if cart is undefined', () => {
      const result: number = pipe.transform(undefined);
      const expectedResult: number = 0;

      expect(result).toEqual(expectedResult);
    });

    it('should return 0 if cart is empty', () => {
      const result: number = pipe.transform([]);
      const expectedResult: number = 0;

      expect(result).toEqual(expectedResult);
    });

    it('should return total cart price', () => {
      const result: number = pipe.transform(mockCartItems());
      const expectedResult: number = 10;

      expect(result).toEqual(expectedResult);
    });
  });
});
