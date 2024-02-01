import { RouterData } from './core/models/router-data.model';
import { InjectionToken } from '@angular/core';
import { ValueOf } from './core/types/value-of.type';


export const RoutePath = {
  HOME: 'home',
  RESTAURANTS: 'restaurants',
  ORDERS: 'orders',
  PROFILE: 'profile',
} as const;

export type RoutePath = ValueOf<typeof RoutePath>;

export const RouteTitle = {
  HOME: 'Home',
  RESTAURANTS: 'Restaurants',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
} as const;

export type RouteTitle = ValueOf<typeof RouteTitle>;

const routerData: RouterData[] = [
  {
    path: RoutePath.HOME,
    title: RouteTitle.HOME,
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
})
