import { ErrorMessageDirective } from './error-message.directive';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { ComponentRef, ElementRef, ViewContainerRef } from '@angular/core';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { PendingComponent } from '../../components/pending/pending.component';
import { merge, of, take } from 'rxjs';
import SpyInstance = jest.SpyInstance;

class MockElementRef extends ElementRef {
  constructor() {
    super({
      addEventListener: () => {
      },
      removeEventListener: () => {
      }
    });
  }
}

class MockPendingComponent {
  setInput(key: string, value: any) {}
}


describe('ErrorMessageDirective', () => {
  let directive: ErrorMessageDirective;
  let mockViewContainerRef: { createComponent: jest.Mock<any, any, any> };
  let ngControl: NgControl;

  const mockErrComponent = {
    destroy: jest.fn(),
    setInput: jest.fn()
  };
  const mockPendingComponent = {
    destroy: jest.fn()
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
        { provide: ControlContainer, useValue: { formDirective: { ngSubmit: { pipe: () => {} } } as unknown as NgForm } },
        { provide: NgControl, useValue: { control: { valueChanges: { subscribe: jest.fn(), pipe: () => {} }, patchValue: ()=>{} }, pending: true } },
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

  describe('ngAfterViewInit', () => {
    let spy: SpyInstance;
    let updateErrorMessageSpy: SpyInstance;
    let updatePendingSpy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(mockViewContainerRef, 'createComponent');
      updateErrorMessageSpy = jest.spyOn(directive as any, 'updateErrorMessage');
      updatePendingSpy = jest.spyOn(directive as any, 'updatePending');
    });
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

    it('should update error message and pending on event', fakeAsync(() => {
      directive['submitted$'] = of(true);
      directive['controlChanges$'] = of('INVALID');
      directive['controlTouched$'] = of(true);

      directive.ngAfterViewInit();

      updateErrorMessageSpy.mockReturnValue(true);
      updatePendingSpy.mockReturnValue(true);

      tick();

      merge(directive['submitted$'], directive['controlChanges$'], directive['controlTouched$'])
        .pipe(take(1))
        .subscribe(() => {
          directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
          expect(updateErrorMessageSpy).toHaveBeenCalled();
          expect(updatePendingSpy).toHaveBeenCalled();
        });

      tick();
    }));
  });

  describe('updateErrorMessage', () => {
    let spy: SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(mockViewContainerRef, 'createComponent');
    });

    it('should update error message', () => {
      directive.ngAfterViewInit();

      directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
      directive['updateErrorMessage']();

      expect(spy).toHaveBeenCalled();
    });
    it('should update pending component if its exists', () => {
      directive.ngAfterViewInit();

      directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
      directive['pendingComponent'] = mockErrComponent as unknown as ComponentRef<PendingComponent>;
      directive['updateErrorMessage']();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updatePending', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(mockViewContainerRef, 'createComponent');
    });

    it('should update pending component', () => {
      directive.ngAfterViewInit();

      directive['pendingComponent'] = mockErrComponent as unknown as ComponentRef<PendingComponent>;
      directive['updatePending']();

      expect(spy).toHaveBeenCalled();
    });

    it('should create an instance if there is no pendingComponent', () => {
      const mockComponentRef = {
        instance: new MockPendingComponent(),
        setInput: jest.fn(), // Mock the setInput method,
        destroy: jest.fn()
      };
      spy.mockReturnValue(mockComponentRef);

      expect(directive['pendingComponent']).toBeUndefined();

      directive['updatePending']();

      expect(spy).toHaveBeenCalled();
      expect(mockComponentRef.setInput).toHaveBeenCalledWith('isPending', ngControl.pending);
    });
  });

  describe('destroy', () => {
    let spyErrDestroy: SpyInstance;
    let spyPendingDestroy: SpyInstance;

    beforeEach(() => {
      spyErrDestroy = mockErrComponent.destroy;
      spyPendingDestroy = mockPendingComponent.destroy;
    });

    it('should destroy components on destroy', () => {
      directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
      directive['pendingComponent'] = mockPendingComponent as unknown as ComponentRef<PendingComponent>;

      directive.ngOnDestroy();

      expect(spyErrDestroy).toHaveBeenCalled();
      expect(spyPendingDestroy).toHaveBeenCalled();
    });

    it('should not destroy pendingComponent if null', () => {
      directive['errComponent'] = mockErrComponent as unknown as ComponentRef<ErrorMessageComponent>;
      directive['pendingComponent'] = null;

      directive.ngOnDestroy();

      expect(spyErrDestroy).toHaveBeenCalled();
      expect(spyPendingDestroy).not.toHaveBeenCalled();
    });
  });
});
