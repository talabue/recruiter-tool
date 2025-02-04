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
    console.log('🟢 Attempting login with:', credentials); // Debugging output

    this.authService.login(credentials).subscribe({
      next: () => {
        console.log('✅ Login successful! Redirecting...');
        this.router.navigate(['/dashboard']); // ✅ Navigate after login
      },
      error: (error: any) => {
        console.error('❌ Login failed:', error);
        this.errorMessage = error.error?.message || 'Login failed';
      },
    });
  }
}
