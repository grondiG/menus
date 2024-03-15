import { CheckNamesValidator } from './check-names.directive';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

describe('CheckNamesDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        ChangeDetectorRef
      ]
    });
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive: CheckNamesValidator = new CheckNamesValidator();
      expect(directive).toBeTruthy();
    });
  });
});
