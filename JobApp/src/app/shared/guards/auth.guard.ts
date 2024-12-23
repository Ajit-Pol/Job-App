import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.checkIfUserLoggedIn()) {
    return true;
  }
  authService.stateUrl = state.url;
  router.navigateByUrl('login');
  return false;
};
