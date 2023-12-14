import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProjectPages } from '../../../environment/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  if (userService.isUserLoggedIn()) {
    return true;
  }
  router.navigate([`${ProjectPages.Auth}/${ProjectPages.Login}`]);
  return false;
};
