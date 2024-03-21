import { CheckPasswordValidator } from './check-password.directive';
import { TestBed } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';

describe('CheckPasswordValidator', () => {
  let directive: CheckPasswordValidator;
  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [{
        provide: ControlContainer, useValue: {}
      }]
    });
    TestBed.runInInjectionContext(() => {
      directive = new CheckPasswordValidator();
    });
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
