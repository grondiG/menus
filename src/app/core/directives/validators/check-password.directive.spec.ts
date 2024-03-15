import { CheckPasswordValidator } from './check-password.directive';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

describe('CheckPasswordValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ControlContainer, useValue: new FormGroupDirective([], []) }]
    });
  });

  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new CheckPasswordValidator();
      expect(directive).toBeTruthy();
    });
  });
});
