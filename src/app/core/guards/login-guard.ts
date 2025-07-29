import { CanActivateFn, Router } from '@angular/router';
import { AccountStorageService } from '../services/account-storage.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const accountStorageService = inject(AccountStorageService);
  const router = inject(Router);

  const isAuthenticated = accountStorageService.isAuthenticated();

  if (isAuthenticated) {
    return router.createUrlTree(['/']);
  }

  return true;
};
