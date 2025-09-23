import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakDebugService {

  constructor(
    private keycloak: KeycloakService,
    private envService: EnvironmentService
  ) { }

  async debugKeycloakConnection(): Promise<void> {
    console.log('🔍 === DEBUT DEBUG KEYCLOAK ===');

    // 1. Vérifier la configuration
    console.log('📋 Configuration Keycloak:');
    console.log('- URL:', this.envService.keycloakUrl);
    console.log('- Realm:', this.envService.keycloakRealm);
    console.log('- Client ID:', this.envService.keycloakClientId);

    // 2. Tester la connectivité de base
    try {
      console.log('🌐 Test de connectivité Keycloak...');
      const response = await fetch(`${this.envService.keycloakUrl}/realms/${this.envService.keycloakRealm}`);
      console.log('✅ Statut de réponse:', response.status);

      if (response.ok) {
        const realmInfo = await response.json();
        console.log('📄 Informations du realm:', realmInfo);

        // Vérifier les URLs dans la réponse
        if (realmInfo['token-service']) {
          if (realmInfo['token-service'].includes('localhost:4200')) {
            console.error('🚨 PROBLÈME TROUVÉ: token-service pointe vers localhost:4200 au lieu de localhost:8080');
            console.error('📋 Solution: Vérifiez la configuration "Frontend URL" dans Keycloak Realm Settings');
          } else {
            console.log('✅ token-service URL semble correcte');
          }
        }
      } else {
        console.error('❌ Erreur de connectivité:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Impossible de se connecter à Keycloak:', error);
    }

    // 3. Vérifier l'état de Keycloak Angular
    try {
      console.log('🔐 État de Keycloak Angular:');
      console.log('- Authentifié:', await this.keycloak.isLoggedIn());
      console.log('- Token disponible:', !!this.keycloak.getToken());

      const keycloakInstance = this.keycloak.getKeycloakInstance();
      console.log('- Instance Keycloak:', !!keycloakInstance);

      if (keycloakInstance) {
        console.log('- Config URL:', keycloakInstance.authServerUrl);
        console.log('- Config Realm:', keycloakInstance.realm);
        console.log('- Config Client ID:', keycloakInstance.clientId);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de l\'état Keycloak:', error);
    }

    console.log('🔍 === FIN DEBUG KEYCLOAK ===');
  }

  async testKeycloakInit(): Promise<boolean> {
    console.log('🚀 Test d\'initialisation Keycloak...');

    try {
      const result = await this.keycloak.init({
        config: {
          url: this.envService.keycloakUrl,
          realm: this.envService.keycloakRealm,
          clientId: this.envService.keycloakClientId
        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
          enableLogging: true
        }
      });

      console.log('✅ Initialisation réussie:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur d\'initialisation:', error);
      return false;
    }
  }
}