import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🛑 AuthInterceptor is running - Intercepting request:', req.url);

    const token = this.authService.getToken();
    console.log('🔍 Token retrieved from AuthService:', token);

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('✅ Token attached to request:', clonedReq.headers.get('Authorization'));
      return next.handle(clonedReq);
    } else {
      console.warn('⚠️ No token found in AuthInterceptor, request sent without Authorization header.');
      return next.handle(req);
    }
  }
}
