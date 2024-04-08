import { Observable, of } from 'rxjs';
import { CartEffects } from './cart.effects';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as cartActions from './cart.actions';
import Spy = jasmine.Spy;
import DoneCallback = jest.DoneCallback;

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  let metadata: EffectsMetadata<CartEffects>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ]
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(CartEffects);
    metadata = getEffectsMetadata(effects);
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getItemsFromLocalStorage$', () => {
    let getItemSpy: jest.SpyInstance;

    beforeEach(() => {
      actions$ = of(cartActions.getItemsFromLocalStorage());
      getItemSpy = jest.spyOn(localStorage, 'getItem');
    });

    it('should call localStorage.getItem with params', (done: DoneCallback) => {
      effects.getItemsFromLocalStorage$.subscribe(() => {
        expect(getItemSpy).toHaveBeenCalledWith('cartItems');
        done();
      });
    });
  });
});
