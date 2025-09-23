import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakInitService {

  constructor(
    private keycloak: KeycloakService,
    private envService: EnvironmentService
  ) { }

  init(): Promise<boolean> {
    console.log('🚀 Initialisation Keycloak...');
    console.log('📋 Configuration:');
    console.log('- URL:', this.envService.keycloakUrl);
    console.log('- Realm:', this.envService.keycloakRealm);
    console.log('- Client ID:', this.envService.keycloakClientId);

    return this.keycloak.init({
      config: {
        url: this.envService.keycloakUrl,
        realm: this.envService.keycloakRealm,
        clientId: this.envService.keycloakClientId
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        enableLogging: true,
        // Force l'URL correcte pour éviter les redirections vers localhost:4200
        adapter: 'default'
      }
    }).then((authenticated) => {
      console.log('✅ Keycloak initialisé, authentifié:', authenticated);
      return authenticated;
    }).catch((error) => {
      console.error('❌ Erreur d\'initialisation Keycloak:', error);
      console.error('📊 Détails de l\'erreur:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    });
  }
}