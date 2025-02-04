import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    const isAuthenticated = this.authService.isAuthenticated();
    
    console.log("🔒 AuthGuard check - Token found:", token);
    console.log("🔑 AuthGuard check - Is Authenticated?", isAuthenticated);

    if (!isAuthenticated) {
      console.warn("⛔ Access denied! Redirecting to login.");
      this.router.navigate(['/login']);
      return false;
    }

    console.log("✅ Access granted to route.");
    return true;
  }
}
