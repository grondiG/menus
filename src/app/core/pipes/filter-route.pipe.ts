import { inject, Pipe, PipeTransform } from '@angular/core';
import { RouterData } from '../models/router-data.model';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of } from 'rxjs';
import * as fromUser from '../../store/user/user.reducer';
import * as fromProfile from '../../store/profile/profile.selectors';
import { RouteTitle } from '../../app.config';

@Pipe({
  name: 'filterRoute',
  standalone: true
})
export class FilterRoutePipe implements PipeTransform {
  private store: Store = inject(Store);
  // private isLogged$: Observable<boolean> = this.store.select(fromUser.isUserLogged);
  private isLogged$: Observable<boolean> = this.store.select(fromProfile.profileIsLoggedSelector);

  hideOnLogout: RouteTitle[] = ['Orders'];

  transform(value: RouterData[]): Observable<RouterData[]> {
    if (!value || !Array.isArray(value) || value.length === 0) {
      of([]);
    }

    return combineLatest([
      of(value),
      this.isLogged$,
    ]).pipe(
      map(([routerData, isLogged]: [RouterData[], boolean]) =>
        routerData.filter(d => !(this.hideOnLogout.includes(d.title) && !isLogged))
      ),
    );
  }
}
