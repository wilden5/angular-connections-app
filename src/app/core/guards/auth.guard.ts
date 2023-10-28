import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('isLoggedIn')) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
