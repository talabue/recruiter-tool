import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';  // ✅ Import `tap` to handle side-effects

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';  // Using the proxy for backend calls

  constructor(private http: HttpClient) {}

  // ✅ Login method with token storage
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response?.token) {
          console.log('✅ Token received:', response.token);  // Debugging output
          this.saveToken(response.token); // ✅ Save token on successful login
        }
      })
    );
  }

  // ✅ Register method with token storage
  register(name: string, email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap(response => {
        if (response?.token) {
          console.log('✅ Registration successful, token saved.');
          this.saveToken(response.token);
        }
      })
    );
  }

  // ✅ Save JWT token in local storage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // ✅ Get JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // ✅ Remove JWT token (Logout)
  logout(): void {
    console.log('🚪 Logging out, token removed.');
    localStorage.removeItem('authToken');
  }

  // ✅ Check if user is logged in
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('🔍 Checking authentication status:', !!token);
    return !!token;
  }
}
