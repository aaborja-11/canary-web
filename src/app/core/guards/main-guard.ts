import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountStorageService } from '../../shared/services/account-storage.service';

export const mainGuard: CanActivateFn = (route, state) => {
  const accountStorageService = inject(AccountStorageService);
  const router = inject(Router);

  const isAuthenticated = accountStorageService.isAuthenticated();

  if (!isAuthenticated) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
