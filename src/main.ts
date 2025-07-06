import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core'; // Import this to add providers

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide routes
    importProvidersFrom(HttpClientModule) // Add HttpClientModule here for global use
  ]
})
  .catch((err) => console.error(err));
