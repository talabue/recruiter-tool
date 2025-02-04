import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../../components/login/login-form.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, LoginFormComponent] // ✅ Add CommonModule for *ngIf support
})
export class LoginPageComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(credentials: { email: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ Login successful, token received:', response.token);
        this.authService.saveToken(response.token);
        console.log('🔍 Token saved:', this.authService.getToken());
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Login failed';
        console.error('❌ Login error:', error);
      }
    });
  } 
}