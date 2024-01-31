import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { profileIsLoggedSelector } from "../../store/profile/profile.selectors";
import { Observable } from "rxjs";
import { AsyncPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import * as profileActions from "../../store/profile/profile.actions";
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
  isLogged$: Observable<boolean> = this.store.select(profileIsLoggedSelector);

  logout(): void {
    this.store.dispatch(profileActions.logout());
  }
}
