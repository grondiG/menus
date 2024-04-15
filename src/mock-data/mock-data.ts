import {
  LoginData,
  MenuItem,
  OrderDto, RegisterData,
  ResponseDataDto,
  Restaurant,
  ShippingForm,
  UserDataDto
} from '../app/core/models';
import { CartItem, OrderData } from '../app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { CartComponent } from '../app/core/containers/cart/cart.component';
import { ComponentRef, ElementRef } from '@angular/core';
import { Routes } from '@angular/router';
import { NgControl, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../app/core/components/error-message/error-message.component';
import { PendingComponent } from '../app/core/components/pending/pending.component';
import { OrdersComponent } from '../app/pages/orders/orders.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { LoginComponent } from '../app/core/containers/login/login.component';

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
      ingredients: [ 'Beef patty', 'Lettuce', 'Tomato', 'Cheese', 'Bun' ],
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
      ingredients: [ 'Mixed greens', 'Chicken', 'Tomato', 'Cucumber', 'Dressing' ],
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
  ingredients: [ 'test' ],
  nutrition: {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    protein: 10,
    fiber: 10,
  }
}

export const mockMenuItem: (name ?: string) => MenuItem = (name ?: string) => ({
  name: name || 'test',
  price: '10',
  ingredients: [ 'test' ],
  nutrition: {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    protein: 10,
    fiber: 10,
  }
});

export const mockOrder: () => OrderData = () => ({
  cart: [ mockCartItem() ],
  totalPrice: 10
});

export const mockShipping: () => ShippingForm = () => ({
  name: 'Test User',
  address: '123 Test Street',
  city: 'Test City',
  country: 'Test Country',
  zip: '12345'
});

export const mockOrderDto: () => OrderDto = () => ({
  ...mockOrder(),
  id: '123',
  userId: '123',
  shipping: mockShipping(),
  date: new Date
  });

export const mockQuantity: () => number = () => 10;

export const mockLanguage: () => string = () => 'en';

export const mockCheckoutRouting: () => Routes = () => ([ { path: 'checkout', component: CartComponent } ]);
export const mockCheckoutRoutes: () => string[] = () => ([ '/checkout' ]);

export const mockOrdersRouting: () => Routes = () => ([ { path: 'orders', component: OrdersComponent } ]);
export const mockOrdersRoutes: () => string[] = () => ([ '/orders' ]);

export const mockUserRouting: () => Routes = () => ([ { path: 'home', component: HomeComponent } ,{ path: 'profile/login', component: LoginComponent}]);
export const mockUserRoutes: () => any = () => ({ home: ['/home'], login: ['profile', 'login'] });

export const mockError: () => HttpErrorResponse = () => ({
  error: 'Test error',
  status: 404,
  statusText: 'Not Found',
} as HttpErrorResponse);

export const mockCartItem: (name ?: string) => CartItem = (name ?: string) => ({
  item: mockMenuItem(name),
  quantity: 2
});

export const mockCartItems: (name ?: string) => CartItem[] = (name ?: string) => ([ mockCartItem(name) ]);


export const mockForm: () => NgForm = () => ({
  form: {
    invalid: false,
    getRawValue: () => {
    }
  }
} as NgForm);

export const mockInvalidForm: () => NgForm = () => ({
  form: {
    invalid: true,
    getRawValue: () => {
    }
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
  valueChanges: {
    subscribe: () => {
    }, pipe: () => {
    }
  }
}) as NgControl;

export const mockSubmitEvent: () => Event = () => new Event('submit');

export const mockValidForm: () => NgForm = () => ({
  invalid: false
}) as NgForm;

export const mockUserId: () => string = () => '123';

export const getBadRequestError: () => HttpErrorResponse = () => new HttpErrorResponse({
  error: new Error('error'),
  status: 400,
  statusText: 'Bad Request'
});

export const mockUserLoginData: () => LoginData = () => ({
  login: 'test',
  password: 'test'
});

export const mockUserRegisterData: () => RegisterData = () => ({
  login: 'test',
  mail: 'test@test.pl',
  restaurantName: 'test',
  restaurantAddress: 'test',
  password: 'test',
  confirmPassword: 'test'
});

export const mockUserData: () => UserDataDto = () => ({
  id: '123',
  login: 'test',
  mail: 'test@test.pl',
  restaurantName: 'test',
  restaurantAddress: 'test'
});

export const mockUserResponse: () => ResponseDataDto = () => ({
  data: mockUserData(),
  token: 'test'
});

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

