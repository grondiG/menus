import { Observable, of } from 'rxjs';
import { CartEffects } from './cart.effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as cartActions from './cart.actions';
import { Action } from '@ngrx/store';
import DoneCallback = jest.DoneCallback;
import SpyInstance = jest.SpyInstance;
import { mockCartItems } from '../../../mock-data';

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.inject(CartEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getItemsFromLocalStorage$', () => {
    let getItemSpy: SpyInstance;

    beforeEach(() => {
      actions$ = of(cartActions.getItemsFromLocalStorage());
      getItemSpy = jest.spyOn(window.localStorage['__proto__'], 'getItem');
    });

    it('should call localStorage.getItem', (done: DoneCallback) => {
      effects.getItemsFromLocalStorage$.subscribe(() => {
        expect(getItemSpy).toHaveBeenCalledWith('cartItems');
        done();
      });
    });

    it('should return setCartItems action', (done: DoneCallback) => {
      getItemSpy.mockReturnValue(JSON.stringify(mockCartItems()));

      effects.getItemsFromLocalStorage$.subscribe((action: Action) => {
        expect(action).toEqual(cartActions.setCartItems({items: mockCartItems()}));
        done();
      });
    });
  });

  describe('clearCart$', () => {
    let removeItemSpy: SpyInstance;

    beforeEach(() => {
      actions$ = of(cartActions.clearCart());
      removeItemSpy = jest.spyOn(window.localStorage['__proto__'], 'removeItem');
    });

    it('should call localStorage.removeItem', (done: DoneCallback) => {
      effects.clearCart$.subscribe(() => {
        expect(removeItemSpy).toHaveBeenCalledWith('cartItems');
        done();
      });
    });
  });
});
