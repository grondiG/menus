import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userIsLoggedSelector } from '../../store/user/user.reducer';
import * as profileActions from '../../store/user/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    NgSwitchCase,
    NgSwitch,
    AsyncPipe,
    NgSwitchDefault
  ],
  standalone: true
})
export class ProfileComponent {
  private store: Store = inject(Store);
  isLogged$: Observable<boolean> = this.store.select(userIsLoggedSelector);

  logout(): void {
    this.store.dispatch(profileActions.logout());
  }
}
