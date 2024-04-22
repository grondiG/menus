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
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  //TODO: Check how to work with translated values
  describe('transform', () => {
    let translateInstantSpy: SpyInstance
    beforeEach(() => {
      translateInstantSpy = jest.spyOn(translate, 'instant');
    });
    it('should return null if errors is null', () => {
      const errors = null;

      const result: string = pipe.transform(errors);
      const expectedResult = null;

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
        const errors = { minlength: true };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.MINLENGTH.TITLE");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { minlength: { requiredLength: 3 } };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation
          + ' '
          + 3
          + ' '
          + mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { minlength: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

    describe('required', () => {
      it('should call instant with proper keys', () => {
        const errors = { required: true };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.REQUIRED");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { required: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { required: false };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

    describe('banWords', () => {
      it('should call instant with proper keys', () => {
        const errors = { banWords: ['word1', 'word2'] };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.BANWORDS");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { banWords: ['word1', 'word2'] };

        const result: string | null = pipe.transform(errors);
        const expectedResult = mockTranslation + 'word1, word2';

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { banWords: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

    describe('passwordMatch', () => {
      it('should call instant with proper keys', () => {
        const errors = { passwordMatch: true };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.PASSWORDMATCH");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { passwordMatch: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { passwordMatch: false };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

    describe('weakPassword', () => {
      it('should call instant with proper keys', () => {
        const errors = { weakPassword: true };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.WEAKPASSWORD");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { weakPassword: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { weakPassword: false };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

    describe('email', () => {
      it('should call instant with proper keys', () => {
        const errors = { email: true };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.EMAIL");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { email: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { email: false };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

    describe('exists', () => {
      it('should call instant with proper keys', () => {
        const errors = { exists: true };

        pipe.transform(errors);

        expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.EXISTS");
        expect(translateInstantSpy).toBeCalledTimes(1);
      });

      it('should create the proper result', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { exists: true };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });

      it('should create the proper result with improper error', () => {
        const mockTranslation: string = 'mock translation';
        translateInstantSpy.mockReturnValue(mockTranslation);

        const errors = { exists: false };

        const result: string | null = pipe.transform(errors);
        const expectedResult: string = mockTranslation;

        expect(result).toEqual(expectedResult);
      });
    });

  describe('unknown', () => {
    it('should call instant with proper keys', () => {
      const errors = { unknown: true };

      pipe.transform(errors);

      expect(translateInstantSpy).toHaveBeenCalledWith("ERROR.INFO.DEFAULT");
      expect(translateInstantSpy).toBeCalledTimes(1);
    });

    it('should create the proper result', () => {
      const mockTranslation: string = 'mock translation';
      translateInstantSpy.mockReturnValue(mockTranslation);

      const errors = { unknown: true };

      const result: string | null = pipe.transform(errors);
      const expectedResult: string = mockTranslation;

      expect(result).toEqual(expectedResult);
    });

    it('should create the proper result with improper error', () => {
      const mockTranslation: string = 'mock translation';
      translateInstantSpy.mockReturnValue(mockTranslation);

      const errors = { unknown: false };

      const result: string | null = pipe.transform(errors);
      const expectedResult: string = mockTranslation;

      expect(result).toEqual(expectedResult);
    });
  });
  });
});
