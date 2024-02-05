import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const skipLoginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const token: string = localStorage.getItem('token');
  if (token) {
    router.navigate(['/user']);
    return false;
  } else {
    return true;
  }
};
