import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GetTotalCartPricePipe } from '../../core/pipes/get-total-cart-price/get-total-cart-price.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import SpyInstance = jest.SpyInstance;
import { OrderData } from '../../core/models/order';
import { getUserId } from '../../store/user/user.reducer';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: MockStore<{ getUserId: string }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTotalCartPricePipe, FormsModule],
      declarations: [CheckoutComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('order', () => {
    let spy: SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
    });

    it('should return if form is invalid', () => {
      const form = {
        invalid: true
      } as any;
      const result: void = component.order({} as any, form);

      expect(result).toBeUndefined();
    });

    it('should return if userId is not defined', () => {
      const userId = '';
      store.overrideSelector(getUserId, userId);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should dispatch addOrder action', () => {
      const form: NgForm = {
        invalid: false
      } as NgForm;
      const order: OrderData = {
        cart: [],
        totalPrice: 0
      } as OrderData;
      const userId = '123';
      store.overrideSelector(getUserId, userId);
      const expectedResult = {
        order: {
          cart: order.cart,
          shipping: component.shippingValue,
          totalPrice: order.totalPrice,
          userId
        },
        type: '[Order] Add order'
      };
      component.order(order, form);

      expect(spy).toHaveBeenCalledWith(expectedResult);
    });


  });

});
