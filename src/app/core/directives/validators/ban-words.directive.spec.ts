import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BanWordsValidator } from './ban-words.directive';

describe('BanWordsValidator', () => {
  let directive: BanWordsValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
    });
    directive = new BanWordsValidator();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return null if control value is empty', () => {
    const control = new FormControl('');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return null if control value is not a string', () => {
    const control = new FormControl(null);
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return null if control value does not contain banned words', () => {
    directive.appBanWords = ['bad', 'worse'];
    const control = new FormControl('This is a good sentence.');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return null in good case', () => {
    directive.appBanWords = ['bad', 'worse'];
    const control = new FormControl('This is a very good sentence.');
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return error object if control value contains banned words', () => {
    directive.appBanWords = ['bad', 'worse'];
    const control = new FormControl('This is a bad sentence.');
    const result = directive.validate(control);
    expect(result).toEqual({ 'banWords': ['bad'] });
  });

  it('should return error object with all matched banned words', () => {
    directive.appBanWords = ['bad', 'worse'];
    const control = new FormControl('This is a bad and worse sentence.');
    const result = directive.validate(control);
    expect(result).toEqual({ 'banWords': ['bad', 'worse'] });
  });

  it('should ignore case when checking for banned words', () => {
    directive.appBanWords = ['BAD', 'WORSE'];
    const control = new FormControl('This is a bad and worse sentence.');
    const result = directive.validate(control);
    expect(result).toEqual({ 'banWords': ['bad', 'worse'] });
  });
});
