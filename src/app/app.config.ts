export const RoutePath = {
  HOME: 'home',
  RESTAURANTS: 'restaurants',
  ORDERS: 'orders',
  PROFILE: 'profile',
} as const;

export const RouteTitle = {
  HOME: 'Home',
  RESTAURANTS: 'Restaurants',
  ORDERS: 'Orders',
  PROFILE: 'Profile',
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
