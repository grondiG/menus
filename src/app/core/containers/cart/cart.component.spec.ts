import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GetTotalCartPricePipe } from '../../pipes/get-total-cart-price/get-total-cart-price.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import { mockCartItem } from '../../../../mock-data/mock-data';
import { removeFromCart } from '../../../store/cart/cart.actions';
import SpyInstance = jest.SpyInstance;
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: MockStore<{ appStateError: HttpErrorResponse }>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTotalCartPricePipe, RouterTestingModule.withRoutes([
        { path: 'checkout', component: CartComponent }
      ]),
        TranslateModule.forRoot()
      ],
      declarations: [CartComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeFromCart', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });
    it('should dispatch removeFromCart action', () => {
      component.removeFromCart(mockCartItem());

      const expectedResult = removeFromCart({ name: 'test' });

      expect(spy).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('checkout', () => {});
    it('should redirect to /checkout', () => {
      const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

      component.checkout();

      const expectedResult: string[] = ['/checkout'];

      expect(routerSpy).toHaveBeenCalledWith(expectedResult);

  });
});
