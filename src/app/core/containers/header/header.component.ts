import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoutePath, RouteTitle } from '../../../app.config';
import { userIsLoggedSelector } from '../../../store/user/user.reducer';
import * as profileActions from '../../../store/user/user.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store: Store = inject(Store);
  private isCartOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private translate: TranslateService = inject(TranslateService);

  isCartOpen$: Observable<boolean> = this.isCartOpen.asObservable();
  isLogged$: Observable<boolean> = this.store.select(userIsLoggedSelector);

  toggleCart(): void {
    this.isCartOpen.next(!this.isCartOpen.value);
  }

  logout(): void {
    this.store.dispatch(profileActions.logout());
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  get langs(): string[] {
    return this.translate.getLangs().filter((lang) => lang !== this.currentLang);
  }

  setLang(lang: string): void {
    this.translate.use(lang);
  }

  protected readonly RoutePath = RoutePath;
  protected readonly RouteTitle = RouteTitle;
}
