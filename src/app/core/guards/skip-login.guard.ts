import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/profile/user.service';

export const skipLoginGuard: CanActivateFn = async () => {
  const navigation: UrlTree = inject(Router).createUrlTree(['/home']);

  try {
    await lastValueFrom(inject(UserService).isTokenValid());
    return navigation;
  } catch (error) {
    return true;
  }
};
