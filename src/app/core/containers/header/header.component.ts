import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filter, map, Observable } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

export interface Route {
  path: string;
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router: Router = inject(Router);

  route$: Observable<string> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      console.log(event.url);
      return event.url;
    })
  );
  routes: Route[] = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/restaurants',
      title: 'Restaurants'
    },
    {
      path: '/orders',
      title: 'Orders'
    },
    {
      path: '/profile',
      title: 'Profile'
    }
  ]

  constructor() {
  }
}
