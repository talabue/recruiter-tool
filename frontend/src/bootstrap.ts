import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ✅ Import routes

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // ✅ Ensures HttpClient works for both CSR & SSR
    provideRouter(routes), // ✅ Use imported routes
  ],
};

// ✅ Explicitly export a function to fix "not a module" error
export function bootstrapApp() {
  return bootstrapApplication(AppComponent, appConfig);
}
