import { GetErrorInfoPipe } from './get-error-info.pipe';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import SpyInstance = jest.SpyInstance;
describe('GetErrorInfoPipe', () => {
  let pipe: GetErrorInfoPipe;
  let translate: TranslateService;
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [GetErrorInfoPipe, TranslateService]
      });

    pipe = TestBed.inject(GetErrorInfoPipe);
    translate = TestBed.inject(TranslateService);
    // translate.use('en')
    // translate.setTranslation('en', {
    //   'ERROR.INFO.MINLENGTH.TITLE': 'Please provide more then',
    //   'ERROR.INFO.MINLENGTH.SUBTITLE': 'characters',
    //   'ERROR.INFO.REQUIRED': 'Input is required',
    //   'ERROR.INFO.BANWORDS': 'Please do not use ban word. List of forbidden words: ',
    //   'ERROR.INFO.PASSWORDMATCH': 'Password do not match',
    //   'ERROR.INFO.WEAKPASSWORD': 'Password is too weak',
    //   'ERROR.INFO.EMAIL': 'Invalid email',
    //   'ERROR.INFO.EXISTS': 'This name already exists',
    //   'ERROR.INFO.DEFAULT': 'Error on input'
    // })
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  //TODO: Check how to work with translated values
  describe('transform', () => {
    let translateInstantSpy: SpyInstance;

    beforeEach(() => {
      translateInstantSpy = jest.spyOn(translate, 'instant');
    });

    it('should return null if errors is null', () => {
      const errors = null;

      const result: string | null = pipe.transform(errors);
      const expectedResult: string | null = null;

      expect(result).toEqual(expectedResult);
    });

    describe('minlength', () => {
      it('should call instant with proper keys', () => {
        const errors = {minlength: {requiredLength: 3}};

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.MINLENGTH.TITLE");
        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.MINLENGTH.SUBTITLE");
        expect(translateInstantSpy).toBeCalledTimes(2);
      });

      it('should call instant once with proper keys for improper error', () => {
        const errors = {minlength: true};

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.MINLENGTH.TITLE");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { minlength: { requiredLength: 3 } };

        const result: string | null = pipe.transform(errors);
        const expectedResult = mockTranslation
          + ' '
          + 3
          + ' '
          + mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = {minlength: true};

        const result: string | null = pipe.transform(errors);
        const expectedResult = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
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
