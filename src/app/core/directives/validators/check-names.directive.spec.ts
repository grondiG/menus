import { CheckNamesValidator } from './check-names.directive';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

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
});
