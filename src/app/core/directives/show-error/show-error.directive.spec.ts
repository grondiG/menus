import { ShowErrorDirective } from './show-error.directive';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, NgControl } from '@angular/forms';
import { ElementRef } from '@angular/core';

describe('ShowErrorDirective', () => {
  let directive: ShowErrorDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ControlContainer, useValue: { formDirective: {} } },
        { provide: NgControl, useValue: { control: { valueChanges: { subscribe: () => {}, pipe: () => {} } } } },
        { provide: ElementRef, useValue: { nativeElement: {} } },
      ]
    });
    TestBed.runInInjectionContext(() => {
      directive = new ShowErrorDirective();
    });
  })
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
