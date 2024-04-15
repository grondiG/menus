import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as orderActions from './order.actions';
import { Observable, of, throwError } from 'rxjs';
import { OrderEffects } from './order.effects';
import { EffectsMetadata, getEffectsMetadata, rootEffectsInit } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { OrdersService } from '../../core/services/orders/orders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getBadRequestError, mockOrderDto, mockOrdersRoutes, mockOrdersRouting } from '../../../mock-data';
import SpyInstance = jest.SpyInstance;
import * as appStateActions from '../app-state/app-state.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import * as cartActions from '../cart/cart.actions';
import * as ordersActions from './order.actions';
import DoneCallback = jest.DoneCallback;
import { provideMockStore } from '@ngrx/store/testing';


describe('OrderEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderEffects;
  let metadata: EffectsMetadata<OrderEffects>;
  let ordersService: OrdersService;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(mockOrdersRouting())
      ],
      providers: [
        OrderEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(OrderEffects);
    metadata = getEffectsMetadata(effects);
    ordersService = TestBed.inject(OrdersService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('onPageLoad$', () => {
    let userStoreSpy: SpyInstance;
    beforeEach(() => {
      actions$ = of(rootEffectsInit());
    });

    it('should call getOrders effect on init if fromUser.userIsLoggedSelector is true', (done: DoneCallback) => {
      userStoreSpy = jest.spyOn(store, 'select').mockReturnValue(of(true));

      effects.onPageLoad$.subscribe((action: Action) => {
        expect(action).toEqual(orderActions.getOrders());
        done();
      });
    });

    it('should return empty observable if fromUser.userIsLoggedSelector is false', (done: DoneCallback) => {
      userStoreSpy = jest.spyOn(store, 'select').mockReturnValue(of(false));

      effects.onPageLoad$.subscribe((action: Action) => {
        expect(action).toEqual({ type: 'NO_ACTION' });
        done();
      });
    });
  });

  describe('addOrder$', () => {
    let serviceSpy: SpyInstance;
    beforeEach(() => {
      actions$ = of(orderActions.addOrder({ order: mockOrderDto()}));
      serviceSpy = jest.spyOn(ordersService, 'order');
    });

    it('should call addOrderSuccess effect on success', (done: DoneCallback) => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

      serviceSpy.mockReturnValue(of(mockOrderDto()));
      effects.addOrder$.subscribe((action: Action) => {
        expect(action).toEqual(orderActions.addOrderSuccess({ order: mockOrderDto() }));
        done();
      });
    });

    it('should call addOrderFailure effect on failure', (done: DoneCallback) => {
      const error: Error = new Error('error');
      serviceSpy.mockReturnValue(throwError(() => error));

      effects.addOrder$.subscribe((action: Action) => {
        expect(action).toEqual(orderActions.addOrderFailure({ error }));
        done();
      });
    });
  });

  describe('addOrderSuccess$', () => {
    beforeEach(() => {
      actions$ = of(orderActions.addOrderSuccess({ order: mockOrderDto() }));
    });

    it('should call redirectToOrders effect on success', (done: DoneCallback) => {
      effects.addOrderSuccess$.subscribe((action: Action) => {
        expect(action).toEqual(orderActions.redirectToOrders());
        done();
      });
    });
  });

  describe('addOrderFailure$', () => {
    beforeEach(() => {
      const error: HttpErrorResponse = getBadRequestError();

      actions$ = of(orderActions.addOrderFailure({ error }));
    });

    it('should call setError effect on failure', (done: DoneCallback) => {
      effects.addOrderFailure$.subscribe((action: Action) => {
        expect(action).toEqual(appStateActions.setError(getBadRequestError()));
        done();
      });
    });
  });

  describe('redirectToOrders$', () => {
    let routerSpy: SpyInstance;
    beforeEach(() => {
      routerSpy = jest.spyOn(router, 'navigate');
      actions$ = of(orderActions.redirectToOrders());
    });

    it('should navigate to orders page', (done: DoneCallback) => {
      effects.redirectToOrders$.subscribe(() => {
        expect(routerSpy).toHaveBeenCalledWith(mockOrdersRoutes());
        done();
      });
    });

    it('should return clearCart action', (done: DoneCallback) => {
      effects.redirectToOrders$.subscribe((action: Action) => {
        expect(action).toEqual(cartActions.clearCart());
        done();
      });
    });
  });

  describe('getOrders$', () => {
    let serviceSpy: SpyInstance;

    beforeEach(() => {
      serviceSpy = jest.spyOn(ordersService, 'getOrdersForUserById');
      actions$ = of(orderActions.getOrders());
    });

    it('should call ordersActions.getOrdersSuccess() if success', (done: DoneCallback) => {
      serviceSpy.mockReturnValue(of([mockOrderDto()]));

      effects.getOrders$.subscribe((action: Action) => {
        expect(action).toEqual(ordersActions.getOrdersSuccess({ orders: [mockOrderDto()] }));
        done();
      });
    });

    it('should call appStateActions.setError() if failure', (done: DoneCallback) => {
      const error: Error = new Error('error');
      serviceSpy.mockReturnValue(throwError(() => error));

      effects.getOrders$.subscribe((action: Action) => {
        expect(action).toEqual(orderActions.getOrdersFailure({ error }));
        done();
      });
    });
  });

  describe('getOrdersFailure$', () => {
    it('should call setError effect on failure', (done: DoneCallback) => {
      const error: HttpErrorResponse = getBadRequestError();

      actions$ = of(orderActions.getOrdersFailure({ error }));

      effects.getOrdersFailure$.subscribe((action: Action) => {
        expect(action).toEqual(appStateActions.setError(getBadRequestError()));
        done();
      });
    });
  })
});
