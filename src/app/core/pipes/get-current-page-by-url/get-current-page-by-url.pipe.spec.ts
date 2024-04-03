import { GetCurrentPageByUrlPipe } from './get-current-page-by-url.pipe';
import { TestBed } from '@angular/core/testing';

describe('GetCurrentPageByUrlPipe', () => {
  let pipe: GetCurrentPageByUrlPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCurrentPageByUrlPipe]
    });

    pipe = TestBed.inject(GetCurrentPageByUrlPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return / if value is empty', () => {
    const value: string = '';

    const result: string = pipe.transform(value);
    const expectedResult: string = '/';

    expect(result).toBe(expectedResult);
  });

  it('should return / if value is null', () => {
    const value: string = null;

    const result: string = pipe.transform(value);
    const expectedResult: string = '/';

    expect(result).toBe(expectedResult);
  });

  it('should return last part of url', () => {
    const value: string = 'a/asd/test';

    const result: string = pipe.transform(value);
    const expectedResult: string = '/test';

    expect(result).toBe(expectedResult);
  });
});
