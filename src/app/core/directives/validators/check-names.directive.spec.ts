import { CheckNamesValidator } from './check-names.directive';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { lastValueFrom, Observable, of } from 'rxjs';
import SpyInstance = jest.SpyInstance;

describe('CheckNamesValidator', () => {
  let directive: CheckNamesValidator;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: ChangeDetectorRef, useValue: {} }, { provide: HttpClient, useValue: {} }]
    });
    TestBed.runInInjectionContext(() => {
      directive = new CheckNamesValidator();
    });
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('validate', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(directive['userService'], 'checkName');
    });
    it('should return null if control value is empty', () => {
      const control: AbstractControl = { value: '' } as AbstractControl;
      const result: Observable<ValidationErrors> = directive.validate(control);
      expect(lastValueFrom(result)).resolves.toBeNull();
    });

    it('should return null if control value is not a string', () => {
      const control: AbstractControl = { value: null } as AbstractControl;
      const result: Observable<ValidationErrors> = directive.validate(control);
      expect(lastValueFrom(result)).resolves.toBeNull();
    });
    it('should return null if user does not exists', () => {
      const control: AbstractControl = { value: 'test' } as AbstractControl;
      spy.mockReturnValue(of({ exists: false }));

      const result: ValidationErrors | null = lastValueFrom(directive.validate(control));
      expect(result).resolves.toBeNull();
    });
    it('should return { exists: true } if user name exists', () => {
      const control: AbstractControl = { value: 'test' } as AbstractControl;
      spy.mockReturnValue(of({ exists: true }));

      const result: ValidationErrors | null = lastValueFrom(directive.validate(control));
      expect(result).resolves.toEqual({ exists: true });
    });
  });
});
