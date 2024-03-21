import { ErrorMessageDirective } from './error-message.directive';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, NgControl } from '@angular/forms';
import { ElementRef, ViewContainerRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() {
    super({
      addEventListener: ()=>{},
      removeEventListener: ()=>{}
    });
  }
}

describe('ErrorMessageDirective', () => {
  let directive: ErrorMessageDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ControlContainer, useValue: { formDirective: {} } },
        { provide: NgControl, useValue: { control: { valueChanges: { subscribe: () => {}, pipe: () => {} } } } },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: ViewContainerRef, useValue: { createComponent: () => {} } },
        // look for mock object for elementRef
        ErrorMessageDirective,
      ]
    });
    //take instance from module
    directive = TestBed.inject(ErrorMessageDirective);
    // TestBed.runInInjectionContext(() => {
    //   directive = new ShowErrorDirective();
    // });
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
