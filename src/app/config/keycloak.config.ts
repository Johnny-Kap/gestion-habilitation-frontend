import { KeycloakConfig } from 'keycloak-js';

export const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'gestion-habilitation',
  clientId: 'gestion-habilitation-frontend'
};

export const keycloakInitOptions = {
  onLoad: 'login-required', // ou 'check-sso'
  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  checkLoginIframe: false,
  flow: 'standard'
};