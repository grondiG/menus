import { GetErrorInfoPipe } from './get-error-info.pipe';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('GetErrorInfoPipe', () => {
  let pipe: GetErrorInfoPipe;
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [GetErrorInfoPipe]
      });

    pipe = TestBed.inject(GetErrorInfoPipe);
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  //TODO: Check how to work with translated values
  describe('transform', () => {
    it('should return null if errors is null', () => {
      const errors = null;

      const result = pipe.transform(errors);
      const expectedResult = null;

      expect(result).toEqual(expectedResult);
    });

    it('should return "Please provide more then 3 characters" if errors is {minlength: {requiredLength: 3}}', () => {
      const errors = {minlength: {requiredLength: 3}};

      const result = pipe.transform(errors);
      const expectedResult = 'Please provide more then 3 characters';

      expect(result).toEqual(expectedResult);
    });

    it('should return "Input is required" if errors is {required: true}', () => {
      const errors = {required: true};

      const result = pipe.transform(errors);
      const expectedResult = 'Input is required';

      expect(result).toEqual(expectedResult);
    });

    it('should return "Please do not use ban word. List of forbidden words: word1, word2" if errors is {banWords: [word1, word2]}', () => {
      const errors = {banWords: ['word1', 'word2']};

      const result = pipe.transform(errors);
      const expectedResult = 'Please do not use ban word. List of forbidden words: word1, word2';

      expect(result).toEqual(expectedResult);
    });

    it('should return "Password do not match" if errors is {passwordMatch: true}', () => {
      const errors = {passwordMatch: true};

      const result = pipe.transform(errors);
      const expectedResult = 'Password do not match';

      expect(result).toEqual(expectedResult);
    });

    it('should return "Password is too weak" if errors is {weakPassword: true}', () => {
      const errors = {weakPassword: true};

      const result = pipe.transform(errors);
      const expectedResult = 'Password is too weak';

      expect(result).toEqual(expectedResult);
    });

    it('should return "Invalid email" if errors is {email: true}', () => {
      const errors = {email: true};

      const result = pipe.transform(errors);
      const expectedResult = 'Invalid email';

      expect(result).toEqual(expectedResult);
    });

    it('should return "This name already exists" if errors is {exists: true}', () => {
      const errors = {exists: true};

      const result = pipe.transform(errors);
      const expectedResult = 'This name already exists';

      expect(result).toEqual(expectedResult);
    });

    it('should return "Error on input" if errors is {unknown: true}', () => {
      const errors = {unknown: true};

      const result = pipe.transform(errors);
      const expectedResult = 'Error on input';

      expect(result).toEqual(expectedResult);
    });
  });
});
