import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userIsLoggedSelector } from '../../../store/user/user.selectors';
import * as profileActions from '../../../store/user/user.actions';
import { RoutePath, RouteTitle } from "../../../app.config";

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
  private store: Store = inject(Store);

  isLogged$: Observable<boolean> = this.store.select(userIsLoggedSelector);

  logout(): void {
    this.store.dispatch(profileActions.logout());
  }

  protected readonly RoutePath = RoutePath;
  protected readonly RouteTitle = RouteTitle;
}
