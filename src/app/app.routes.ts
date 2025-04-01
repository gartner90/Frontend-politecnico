import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core';
import { RoutesEnum } from './shared/enums';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.HOME,
    pathMatch: 'full'
  },
  {
    path: RoutesEnum.HOME,
    canMatch: [noAuthGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: RoutesEnum.REGISTER,
    canMatch: [noAuthGuard],
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: RoutesEnum.LOGIN,
    canMatch: [noAuthGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: RoutesEnum.CONTACT,
    canMatch: [noAuthGuard],
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
  },
  {
    path: RoutesEnum.APPOINTMENTS,
    canMatch: [authGuard],
    loadComponent: () =>
      import('./pages/appointments/appointments.component').then(
        (c) => c.AppointmentsComponent
      ),
  },
  {
    path: RoutesEnum.PROFILE,
    canMatch: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: RoutesEnum.USERS,
    canMatch: [authGuard],
    loadComponent: () =>
      import('./pages/users/users.component').then(
        (c) => c.UsersComponent
      ),
  },
];
