import { forkJoin, Observable, of } from 'rxjs';
import { CartEffects } from './cart.effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as cartActions from './cart.actions';
import { Action } from '@ngrx/store';
import DoneCallback = jest.DoneCallback;
import SpyInstance = jest.SpyInstance;
import { mockCartItems } from '../../../mock-data';
import { EffectsMetadata, getEffectsMetadata, rootEffectsInit } from '@ngrx/effects';
import { CartItem } from '../../core/models';

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  let metadata: EffectsMetadata<CartEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.inject(CartEffects);
    metadata = getEffectsMetadata(effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('init$', () => {
    beforeEach(() => {
      actions$ = of(rootEffectsInit());
    });

    it('should return getItemsFromLocalStorage action', (done: DoneCallback) => {
      effects.init$.subscribe((action: Action) => {
        expect(action).toEqual(cartActions.getItemsFromLocalStorage());
        done();
      });
    });
  });

  describe('addItemToLocalStorage$', () => {
    let localStorageGetSpy: SpyInstance;
    let localStorageSetSpy: SpyInstance;

    beforeEach(() => {
      localStorageGetSpy = jest.spyOn(window.localStorage['__proto__'], 'getItem');
      localStorageSetSpy = jest.spyOn(window.localStorage['__proto__'], 'setItem');
    });

    it('should get items from localStorage', (done: DoneCallback) => {
      actions$ = of(cartActions.addToCart({item: mockCartItems()[0]}));

      effects.addItemToLocalStorage$.subscribe(() => {
        expect(localStorageGetSpy).toHaveBeenCalledWith('cartItems');
        done();
      });
    });

    it('should increment quantity of action quantity if name already exists and call addToCart action', (done: DoneCallback) => {
      const mockStorageItems: CartItem[] = mockCartItems();

      localStorageGetSpy.mockReturnValue(JSON.stringify(mockStorageItems));

      actions$ = of(cartActions.addToCart({item: mockCartItems()[0]}));

      forkJoin([actions$, effects.addItemToLocalStorage$]).subscribe((data) => {
        const [actionData, action] = data;
        let item: CartItem = mockStorageItems.find((item: CartItem): boolean => item.item.name === actionData.item.item.name);
        item = {...item, quantity: item.quantity + actionData.item.quantity};
        expect(localStorageSetSpy).toHaveBeenCalledWith('cartItems', JSON.stringify([item]));
        expect(action).toEqual(cartActions.addToCart({item: actionData.item}));
        done();
      });
    });

    it('should add item to localStorage and call addToCart action', (done: DoneCallback) => {
      const mockStorageItems: CartItem[] = mockCartItems();

      localStorageGetSpy.mockReturnValue(JSON.stringify(mockStorageItems));

      actions$ = of(cartActions.addToCart({item: mockCartItems('test2')[0]}));

      forkJoin([actions$, effects.addItemToLocalStorage$]).subscribe((data) => {
        const [actionData, action] = data;
        const item: CartItem = actionData.item;
        expect(localStorageSetSpy).toHaveBeenCalledWith('cartItems', JSON.stringify([...mockStorageItems, item]));
        expect(action).toEqual(cartActions.addToCart({item: actionData.item}));
        done();
      });
    });

    it('should not dispatch', () => {
      expect(metadata.addItemToLocalStorage$).toMatchObject({ dispatch: false });
    });
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

  describe('removeItemFromLocalStorage$', () => {
    let localStorageGetSpy: SpyInstance;
    let localStorageSetSpy: SpyInstance;

    beforeEach(() => {
      actions$ = of(cartActions.removeFromCart({name: 'test'}));
      localStorageGetSpy = jest.spyOn(window.localStorage['__proto__'], 'getItem');
      localStorageSetSpy = jest.spyOn(window.localStorage['__proto__'], 'setItem');
    });

    it('should call localStorage.getItem', (done: DoneCallback) => {
      effects.removeItemFromLocalStorage$.subscribe(() => {
        expect(localStorageGetSpy).toHaveBeenCalledWith('cartItems');
        done();
      });
    });

    it('should call localStorage.setItem without deleted value', (done: DoneCallback) => {
      localStorageGetSpy.mockReturnValue(JSON.stringify(mockCartItems()));

      effects.removeItemFromLocalStorage$.subscribe((action: Action) => {
        expect(localStorageSetSpy).toHaveBeenCalledWith('cartItems', JSON.stringify([]));
        expect(action).toEqual(cartActions.removeFromCart({name: 'test'}));
        done();
      });
    });

    it('should not dispatch', () => {
      expect(metadata.removeItemFromLocalStorage$).toMatchObject({ dispatch: false });
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

    it('should not dispatch', () => {
      expect(metadata.clearCart$).toMatchObject({ dispatch: false });
    });
  });
});
