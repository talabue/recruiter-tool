import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('🔒 AuthGuard check:', isAuth);
    if (!isAuth) {
      console.warn('⛔ Access denied. Redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
