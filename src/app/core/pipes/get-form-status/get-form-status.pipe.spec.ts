import { GetFormStatusForPipe } from './get-form-status.pipe';
import { TestBed } from '@angular/core/testing';
import { NgModel } from '@angular/forms';

describe('GetFormStatusPipe', () => {
  let pipe: GetFormStatusForPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFormStatusForPipe]
    });
    pipe = TestBed.inject(GetFormStatusForPipe);
  });

  it('create an instance', () => {
    const pipe = new GetFormStatusForPipe();
    expect(pipe).toBeTruthy();
  });
  describe('transform', () => {
    it('should return true if form is submitted', () => {
      const form = { submitted: true };
      const result: boolean = pipe.transform(form as any, {} as any);
      const expectedResult: true = true;
      expect(result).toBe(expectedResult);
    });
    it('should return true if control is dirty', () => {
      const form = { submitted: false };
      const control = { dirty: true } as NgModel;

      const result: boolean = pipe.transform(form as any, control);
      const expectedResult: true = true;
      expect(result).toBe(expectedResult);
    });
    it('should return true if control is touched', () => {
      const form = { submitted: false };
      const control = { dirty: false, touched: true };

      const result: boolean = pipe.transform(form as any, control as any);
      const expectedResult: true = true;
      expect(result).toBe(expectedResult);
    });
    it('should return false if control is untouched', () => {
      const form = { submitted: false };
      const control = { dirty: false, touched: false };

      const result: boolean = pipe.transform(form as any, control as any);
      const expectedResult: false = false;
      expect(result).toBe(expectedResult);
    });
  });
});
