import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';  // ✅ Import withFetch

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch())  // ✅ Enable fetch() API support
  ]
}).catch(err => console.error(err));
