import { Injectable } from '@angular/core';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  public get keycloakUrl(): string {
    return window.__env__?.KEYCLOAK_URL || 'http://localhost:8080';
  }

  public get keycloakRealm(): string {
    return window.__env__?.KEYCLOAK_REALM || 'gestion-habilitation';
  }

  public get keycloakClientId(): string {
    return window.__env__?.KEYCLOAK_CLIENT_ID || 'gestion-habilitation-frontend';
  }

  public get apiBaseUrl(): string {
    return window.__env__?.API_BASE_URL || 'http://localhost:9000/api';
  }
}