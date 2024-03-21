import { ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorMessageDirective } from './error-message.directive';

const ngControlMock: NgControl = {
  control: new FormControl(),
  name: 'test'
} as unknown as NgControl;

const viewContainerRefMock: ViewContainerRef = {
  createComponent: () => {
  }
} as unknown as ViewContainerRef;

const elementRefMock: ElementRef = {
  nativeElement: {
    blur: () => {
    }
  }
} as unknown as ElementRef;

describe('ErrorMessageDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgControl, useValue: ngControlMock },
        { provide: ControlContainer, useValue: new FormGroupDirective([], []) },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
        { provide: ElementRef, useValue: elementRefMock },
      ]
    });
  });
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new ErrorMessageDirective();
      expect(directive).toBeTruthy();
    });
  });
});
