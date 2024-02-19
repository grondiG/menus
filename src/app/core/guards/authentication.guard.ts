import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/profile/user.service';

export const authenticationGuard: CanActivateFn = async () => {
  const navigation: UrlTree = inject(Router).createUrlTree(['/profile', 'login']);

  try {
    await lastValueFrom(inject(UserService).isTokenValid());
    return true;
  } catch (error) {
    return navigation;
  }
};
