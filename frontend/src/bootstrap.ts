import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/services/auth.interceptor'; // ✅ Import Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // ✅ Use interceptors from DI
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // ✅ Register AuthInterceptor
  ],
};

export function bootstrapApp() {
  return bootstrapApplication(AppComponent, appConfig);
}
