import { InjectionToken } from '@angular/core';
import { CartItem } from './core/models';

export const RoutePath = {
  HOME: 'home',
  RESTAURANTS: 'restaurants',
  ORDERS: 'orders',
  PROFILE: 'profile',
  CHECKOUT: 'checkout',
} as const;

export const RouteTitle = {
  HOME: 'Home',
  RESTAURANTS: 'Restaurants',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
  CHECKOUT: 'Checkout',
} as const;

/*const routerData: RouterData[] = [
  {
    path: RoutePath.HOME,
    title: RouteTitle.HOME
  },
  {
    path: RoutePath.RESTAURANTS,
    title: RouteTitle.RESTAURANTS
  },
  {
    path: RoutePath.ORDERS,
    title: RouteTitle.ORDERS
  },
  {
    path: RoutePath.PROFILE,
    title: RouteTitle.PROFILE
  }
]

export const ROUTER_DATA: InjectionToken<RouterData[]> = new InjectionToken<RouterData[]>('router data', {
  factory: () => routerData,
})*/

export interface CartStorage {
  getItems(): CartItem[];
  addItem(items: CartItem): boolean;
  clearCart(): void;
  removeItem(name: string): void;
}

const localStorageToken: InjectionToken<Storage> = new InjectionToken<Storage>('local storage implementation', {
  providedIn: 'root',
  factory: () => window?.localStorage || null
});

const cartStorageFactory: CartStorage = {
    getItems(): CartItem[] {
      const cartItems: string = localStorage.getItem('cartItems');
      const items: CartItem[] = cartItems ? JSON.parse(cartItems) : [];
      return items;
    },
    addItem(action: CartItem): boolean {
      const cartItems: string = localStorage.getItem('cartItems');
      const items: CartItem[] = cartItems ? JSON.parse(cartItems) : [];
      if (items.find((item: CartItem): boolean => item.item.name === action.item.name)) {
        items.map((item: CartItem) => {
          if (item.item.name === action.item.name) {
            item.quantity += action.quantity;
          }
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
        // cartActions.addToCart({ item: action });
        return true;
      }
      items.push(action);
      localStorage.setItem('cartItems', JSON.stringify(items));
      return false;
    },
    clearCart(): void {
      localStorage.removeItem('cartItems');
    },
    removeItem(name: string): void {
      const cartItems: string = localStorage.getItem('cartItems');
      const items: CartItem[] = cartItems ? JSON.parse(cartItems) : [];
      const updatedItems: CartItem[] = items.filter((item: CartItem) => item.item.name !== name);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
}

export const CART_STORAGE: InjectionToken<CartStorage> = new InjectionToken<CartStorage>('cart storage', {
  factory: () => cartStorageFactory
});
