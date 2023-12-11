import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { ProjectPath } from '../../utils/project-constants';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  if (loginService.isLoggedIn()) {
    return true;
  }
  router.navigate([ProjectPath.Login]);
  return false;
};
