import { RestaurantDescriptionPipe } from './restaurant-description.pipe';
import { TestBed } from '@angular/core/testing';

describe('RestaurantDescriptionPipe', () => {
  let pipe: RestaurantDescriptionPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RestaurantDescriptionPipe] });
    pipe = TestBed.inject(RestaurantDescriptionPipe);
  });

  it('create an instance', () => {
    const pipe = new RestaurantDescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return empty string if value is null', () => {
      const result: string = pipe.transform(null);
      const expectedResult: string = '';

      expect(result).toBe(expectedResult);
    });

    it('should return empty string if value is undefined', () => {
      const result: string = pipe.transform(undefined);
      const expectedResult: string = '';

      expect(result).toBe(expectedResult);
    });

    it('should return empty string if value is empty', () => {
      const result: string = pipe.transform('');
      const expectedResult: string = '';

      expect(result).toBe(expectedResult);
    });

    it('should return the same value if length is less than 30', () => {
      const result: string = pipe.transform('This is a test');
      const expectedResult: string = 'This is a test';

      expect(result).toBe(expectedResult);
    });

    it('should return the same value if length is equal to 30', () => {
      const result: string = pipe.transform('This is a test, this is a test');
      const expectedResult: string = 'This is a test, this is a test';

      expect(result).toBe(expectedResult);
    });

    it('should cut short value and add ... if length is greater than 30', () => {
      const result: string = pipe.transform('This is a test, this is a test, this is a test');
      const expectedResult: string = 'This is a test, this is a test...';

      expect(result).toBe(expectedResult);
    });

  });

});
