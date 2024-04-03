import { ErrorMessageDirective } from './error-message.directive';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, NgControl } from '@angular/forms';
import { ComponentRef, ElementRef, ViewContainerRef } from '@angular/core';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { PendingComponent } from '../../components/pending/pending.component';
import SpyInstance = jest.SpyInstance;

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
  let mockViewContainerRef: { createComponent: jest.Mock<any, any, any> };
  let ngControl: NgControl;
  const mockErrComponent = {
    destroy: jest.fn(),
    setInput: jest.fn()
  };

  mockViewContainerRef = {
    createComponent: jest.fn().mockReturnValue({
      instance: {},
      destroy: jest.fn()
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
      providers: [
        { provide: ControlContainer, useValue: { formDirective: {} } },
        { provide: NgControl, useValue: { control: { valueChanges: { subscribe: jest.fn(), pipe: () => {} }, patchValue: ()=>{} } } },
        { provide: ElementRef, useClass: MockElementRef },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
        ErrorMessageDirective,
      ]
    });
    //take instance from module
    directive = TestBed.inject(ErrorMessageDirective);
    ngControl = TestBed.inject(NgControl);
    // TestBed.runInInjectionContext(() => {
    //   directive = new ShowErrorDirective();
    // });
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('parentForm', () => {
    it('should return parent form', () => {
      expect(directive.parentForm).toBeTruthy();
    });
  });

  describe('ngControl', () => {
    it('should return ngControl', () => {
      expect(ngControl).toBeTruthy();
    });

    it('should throw error if no control model', () => {
      const mockNgControlWithoutControl = {
        control: null,
        valueChanges: { subscribe: () => {}, pipe: () => {} }
      };

      directive['ngControl'] = mockNgControlWithoutControl as unknown as NgControl;

      const directiveWithoutControl = TestBed.inject(ErrorMessageDirective);

      expect(() => directiveWithoutControl.ngAfterViewInit()).toThrowError();
    });
  });

  describe('updateErrorMessage', () => {
    let spy: SpyInstance;

    it('should update error message', () => {
      directive.ngAfterViewInit();

      spy = jest.spyOn(mockViewContainerRef, 'createComponent');

      directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
      directive['updateErrorMessage']();

      expect(spy).toHaveBeenCalled();
    });
    it('should update pending component if its exists', () => {
      directive.ngAfterViewInit();

      spy = jest.spyOn(mockViewContainerRef, 'createComponent');

      directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
      directive['pendingComponent'] = mockErrComponent as unknown as ComponentRef<PendingComponent>;
      directive['updateErrorMessage']();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updatePending', () => {
    let spy: SpyInstance;
    it('should update pending component', () => {
      directive.ngAfterViewInit();

      spy = jest.spyOn(mockViewContainerRef, 'createComponent');

      directive['pendingComponent'] = mockErrComponent as unknown as ComponentRef<PendingComponent>;
      directive['updatePending']();

      expect(spy).toHaveBeenCalled();
    });
  });


  it('should destroy components on destroy', () => {
    const mockPendingComponent = {
      destroy: jest.fn()
    };

    let spyErrDestroy: SpyInstance = mockErrComponent.destroy;
    let spyPendingDestroy: SpyInstance = mockPendingComponent.destroy;


    directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
    directive['pendingComponent'] = mockPendingComponent as unknown as ComponentRef<PendingComponent>;

    directive.ngOnDestroy();

    expect(spyErrDestroy).toHaveBeenCalled();
    expect(spyPendingDestroy).toHaveBeenCalled();
  });

  it('should not destroy pendingComponent if null', () => {
    const mockPendingComponent = {
      destroy: jest.fn()
    };

    let spyErrDestroy: SpyInstance = mockErrComponent.destroy;
    let spyPendingDestroy: SpyInstance = mockPendingComponent.destroy;

    directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
    directive['pendingComponent'] = null;

    directive.ngOnDestroy();

    expect(spyErrDestroy).toHaveBeenCalled();
    expect(spyPendingDestroy).not.toHaveBeenCalled();
  });


});
