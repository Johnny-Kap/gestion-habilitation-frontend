import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { ConfigService } from './app/config/app.config';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.log('Mode SSR détecté - Keycloak non initialisé');
      return Promise.resolve(false);
    }

    const config = ConfigService.getConfig();
    
    console.log('Initialisation de Keycloak avec la configuration:', config.keycloak);
    
    return keycloak.init({
      config: {
        url: config.keycloak.url,
        realm: config.keycloak.realm,
        clientId: config.keycloak.clientId
      },
      initOptions: {
        onLoad: 'login-required', // Forcer la connexion
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        redirectUri: window.location.origin + '/dashboard'
      },
      loadUserProfileAtStartUp: true
    }).then((authenticated) => {
      console.log('Keycloak initialisé. Authentifié:', authenticated);
      console.log('Token présent:', !!keycloak.getToken());
      
      if (!authenticated) {
        console.log('Utilisateur non authentifié, redirection vers Keycloak...');
        keycloak.login({
          redirectUri: window.location.origin + '/dashboard'
        });
        return false;
      }
      
      return authenticated;
    }).catch(error => {
      console.error('Erreur lors de l\'initialisation de Keycloak:', error);
      throw error; // Relancer l'erreur pour bloquer l'app si Keycloak ne fonctionne pas
    });
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      ReactiveFormsModule,
      FormsModule,
      NgbModule,
      KeycloakAngularModule
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
}).catch(err => {
  console.error('Erreur de démarrage de l\'application:', err);
});