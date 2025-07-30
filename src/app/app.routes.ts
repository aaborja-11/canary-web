import { Routes } from '@angular/router';
import { mainGuard } from './core/guards/main-guard';
import { loginGuard } from './core/guards/login-guard';
import { MainComponent } from './features/main/main.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [mainGuard],
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/main/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./features/main/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
