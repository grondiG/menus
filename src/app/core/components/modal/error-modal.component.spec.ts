import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorModalComponent } from './error-modal.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromApp from '../../../store/app-state/app-state.reducer';
import SpyInstance = jest.SpyInstance;
import { mockError } from '../../../../mock-data';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let store: MockStore<{ appStateError: HttpErrorResponse }>;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorModalComponent],
      providers: [provideMockStore()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('counter$', () => {
    it('should be undefined', () => {
      expect(component.counter$).toBeUndefined();
    });
  });

  describe('error$', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(component, 'createCloseModalTimer');
    });

    it('should call createCloseModalTimer when error$ emits HttpErrorResponse', () => {


      store.overrideSelector(fromApp.appStateError, mockError());

      expect(component.createCloseModalTimer).not.toHaveBeenCalled();

      component.error$.subscribe();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('createCloseModalTimer', () => {
    it('should create a timer', () => {
      component.createCloseModalTimer();
      expect(component.counter$).toBeTruthy();
    });
  });

  describe('closeModal', () => {
    let dispatchSpy: SpyInstance;
    beforeEach(() => {
      dispatchSpy = jest.spyOn(store, 'dispatch');
    });

    it('should dispatch clearError action', () => {
      component.closeModal();

      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should stop the timer', async () => {
      component.createCloseModalTimer();
      const counter$: Observable<number> = component.counter$ as Observable<number>;
      const lastValue: number = await lastValueFrom(counter$);
      expect(lastValue).toBe(1);
    }, 15000);
  });
});
