import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const skipLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    router.navigate(['/profile']);
    return false;
  } else {
    return true;
  }
};
