import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginPageComponent }, // Default route
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // ✅ Protect the dashboard
  { path: '**', redirectTo: 'login' } // Catch-all redirect to login
];
