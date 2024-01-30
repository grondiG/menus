import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterData } from "../../models/router-data.model";
import { ROUTER_DATA } from "../../../app.config";
import { Observable } from "rxjs";
import { profileIsLoggedSelector } from "../../../store/profile/profile.selectors";
import { Store } from "@ngrx/store";

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
  isLogged$: Observable<boolean> = this.store.select(profileIsLoggedSelector);

  logout(): void {

  }
}
