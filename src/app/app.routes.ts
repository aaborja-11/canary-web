import { Routes } from '@angular/router';
import { mainGuard } from './core/guards/main-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [mainGuard],
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
