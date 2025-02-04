import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // ✅ Import this

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any // ✅ Inject platform ID
  ) {
    this.clearTokenOnAppStart(); // ✅ Clear token on app start
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(name: string, email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { name, email, password });
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      console.log('🔍 AuthService: Retrieved token from localStorage:', token);
      return token;
    }
    console.warn('⚠️ AuthService: Attempted to access localStorage on server.');
    return null;
  }
  
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('🔍 Checking authentication, token found:', token);
    return !!token; // Ensure this returns true when a valid token exists
  }
  

  // ✅ Clears token on app load to force login each time
  private clearTokenOnAppStart(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }
}
