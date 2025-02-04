import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { AddCandidateComponent } from './pages/add-candidate/add-candidate.component'; 
import { EditCandidateComponent } from './pages/edit-candidate/edit-candidate.component'; 
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginPageComponent }, // Default route
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'candidates', component: CandidatesComponent, canActivate: [AuthGuard] }, 
  { path: 'candidates/add', component: AddCandidateComponent, canActivate: [AuthGuard] }, 
  { path: 'edit-candidate/:id', component: EditCandidateComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } // Catch-all redirect to login
];
