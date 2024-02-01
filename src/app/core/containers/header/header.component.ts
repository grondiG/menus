import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterData } from '../../models/router-data.model';
import { ROUTER_DATA } from '../../../app.config';
import * as fromUser from '../../../store/user/user.reducer';
import * as profileActions from '../../../store/profile/profile.actions';

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

  routes: RouterData[] = inject(ROUTER_DATA);
  isLogged$: Observable<boolean> = this.store.select(fromUser.isUserLogged);

  logout(): void {
    this.store.dispatch(profileActions.logout());
  }
}
