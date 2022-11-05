import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FreeGuard } from './guards/free.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [FreeGuard]
  },
  {
    path: 'auth/register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [FreeGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'termsandconditions',
    loadChildren: () => import('./pages/termsandconditions/termsandconditions.module').then( m => m.TermsandconditionsPageModule)
  },
  {
    path: 'auth/forgot-password',
    loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule),
    canActivate: [FreeGuard]
  },
  {
    path: 'auth/reset-password',
    loadChildren: () => import('./pages/auth/new-password/new-password.module').then( m => m.NewPasswordPageModule),
    canActivate: [FreeGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
