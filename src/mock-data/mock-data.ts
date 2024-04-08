import { MenuItem, Restaurant } from '../app/core/models';
import { CartItem, OrderData } from '../app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { CartComponent } from '../app/core/containers/cart/cart.component';
import { ComponentRef, ElementRef } from '@angular/core';
import { Routes } from '@angular/router';
import { NgControl, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../app/core/components/error-message/error-message.component';
import { PendingComponent } from '../app/core/components/pending/pending.component';

export const restaurantMockData: () => Restaurant = () => ({
  id: '1',
  name: 'Test Restaurant',
  description: 'A test restaurant for testing purposes',
  address: '123 Test Street',
  image: 'https://example.com/test.jpg',
  menu: [
    {
      name: 'Burger',
      price: '$10.99',
      ingredients: ['Beef patty', 'Lettuce', 'Tomato', 'Cheese', 'Bun'],
      nutrition: {
        calories: 550,
        protein: 25,
        carbohydrates: 45,
        fat: 30,
        fiber: 5
      }
    },
    {
      name: 'Salad',
      price: '$8.99',
      ingredients: ['Mixed greens', 'Chicken', 'Tomato', 'Cucumber', 'Dressing'],
      nutrition: {
        calories: 350,
        protein: 20,
        carbohydrates: 15,
        fat: 15,
        fiber: 8
      }
    }
  ]
});

export const mockDish: MenuItem = {
  name: 'test',
  price: '10',
  ingredients: ['test'],
  nutrition: {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    protein: 10,
    fiber: 10,
  }
}

export const mockMenuItem: () => MenuItem = () => ({
  name: 'test',
  price: '10',
  ingredients: ['test'],
  nutrition: {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    protein: 10,
    fiber: 10,
  }
});

export const mockOrder: () => OrderData = () => ({
  cart: [mockCartItem()],
  totalPrice: 10
});

export const mockQuantity: () => number = ()=> 10;

export const mockLanguage: () => string = () => 'en';

export const mockCheckoutRouting: () => Routes = () => ([{ path: 'checkout', component: CartComponent }]);
export const mockCheckoutRoutes: () => string[]  = () => (['/checkout']);

export const mockError: () => HttpErrorResponse = () => ({
  error: 'Test error',
  status: 404,
  statusText: 'Not Found',
} as HttpErrorResponse);

export const mockCartItem: () => CartItem = () => ({
  item: mockMenuItem(),
  quantity: 1
});

export const mockCartItems: () => CartItem[] = () => ([mockCartItem()]);


export const mockForm: () => NgForm = () => ({
  form: {
    invalid: false,
    getRawValue: () => {}
  }
} as NgForm);

export const mockInvalidForm: () => NgForm = () => ({
  form: {
    invalid: true,
    getRawValue: () => {}
  }
} as NgForm);

export const mockElementRef: () => ElementRef = () => new MockElementRef();

export const mockErrComponent: () => ComponentRef<ErrorMessageComponent> = () => ({
  destroy: jest.fn(),
  setInput: jest.fn()
}) as unknown as ComponentRef<ErrorMessageComponent>;

export const mockPendingComponent: () => ComponentRef<PendingComponent> = () => ({
  destroy: jest.fn(),
  setInput: jest.fn()
}) as unknown as ComponentRef<PendingComponent>;

export const mockViewContainerRef: () => { createComponent: jest.Mock<any, any, any> } = () => ({
  createComponent: jest.fn().mockReturnValue({
    instance: {},
    destroy: jest.fn()
  })
}) as { createComponent: jest.Mock<any, any, any> };

export const mockNgControlWithoutControl: () => NgControl = () => ({
  control: null,
  valueChanges: { subscribe: () => {}, pipe: () => {} }
}) as NgControl;

export const mockSubmitEvent: () => Event = () => new Event('submit');

export const mockValidForm: () => NgForm = () => ({
  invalid: false
}) as NgForm;

export const mockUserId: () => string = () => '123';

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

export const mockSearchValue: 'searchValue' = 'searchValue';

