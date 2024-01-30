import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    router.navigate(['/profile/login']);
    return false;
  }
};
