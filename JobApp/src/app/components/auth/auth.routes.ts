import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { AppName } from '../../shared/shared.model';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      hideHeaderFooter: true
    },
    title: AppName + ' - Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      hideHeaderFooter: true
    },
    title: AppName + ' - Register'
  },
  {
    path: 'profile',
    // component: ProfileComponent,
    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
    data: {
      role: ['reader', 'creator']
    },
    title: AppName + ' - My Profile',
    canActivate: [authGuard]
  },
  {
    path: 'reset-password',
    // component: ForgotPasswordComponent,
    loadComponent: () => import('./forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
    data: {
      hideHeaderFooter: true
    },
    title: AppName + ' - Reset Password'
    // canActivate: [AuthGuard]
  }
];