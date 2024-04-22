import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { userIsAdminSelector } from '../../store/user/user.reducer';

export const adminGuard: CanActivateFn = () => {
  const returnToHome: UrlTree = inject(Router).createUrlTree(['/home']);

  const store: Store = inject(Store);

  return store.select(userIsAdminSelector).pipe(
    map((isAdmin: boolean): boolean|UrlTree => isAdmin ? true : returnToHome),
  );
};
