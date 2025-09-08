import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Keycloak
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

// Fonction d'initialisation Keycloak conditionnelle
function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    const platformId = inject(PLATFORM_ID);
    
    if (!isPlatformBrowser(platformId)) {
      console.log('SSR mode - Skipping Keycloak initialization');
      return Promise.resolve();
    }

    console.log('Browser mode - Initializing Keycloak');
    
    return keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'gestion-habilitation',
        clientId: 'gestion-habilitation-frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256'
      }
    }).catch(error => {
      console.error('Keycloak initialization failed:', error);
      return Promise.resolve();
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Router
    provideRouter(routes),
    
    // HTTP Client
    provideHttpClient(withInterceptors([authInterceptor])),
    
    // Animations
    provideAnimations(),
    
    // Modules
    importProvidersFrom(
      ReactiveFormsModule,
      FormsModule,
      NgbModule,
      KeycloakAngularModule
    ),
    
    // Keycloak initialization
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};