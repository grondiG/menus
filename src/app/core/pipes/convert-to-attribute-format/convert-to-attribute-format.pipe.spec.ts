import { ConvertToAttributeFormatPipe } from './convert-to-attribute-format.pipe';
import { TestBed } from '@angular/core/testing';

describe('ConvertToAttributeFormatPipe', () => {
  let pipe: ConvertToAttributeFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvertToAttributeFormatPipe],
    }).compileComponents();

    pipe = TestBed.inject(ConvertToAttributeFormatPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if value is undefined', () => {
    const value: string = undefined;

    const result: string = pipe.transform(value);
    const expectedResult: string = '';

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty string if value is null', () => {
    const value: string = null;

    const result: string = pipe.transform(value);
    const expectedResult: string = '';

    expect(result).toEqual(expectedResult);
  });
});
