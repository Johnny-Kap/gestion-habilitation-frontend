import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, BehaviorSubject, of } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfileSubject = new BehaviorSubject<KeycloakProfile | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initUserProfile();
    }
  }

  private async initUserProfile(): Promise<void> {
    if (!this.isBrowser) return;

    if (this.keycloakService.isLoggedIn()) {
      try {
        const profile = await this.keycloakService.loadUserProfile();
        this.userProfileSubject.next(profile);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    }
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return this.keycloakService.isLoggedIn();
  }

  // Obtenir le token d'accès (version async)
  async getToken(): Promise<string> {
    if (!this.isBrowser) return '';

    try {
      const token = await this.keycloakService.getToken();
      return token || '';
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return '';
    }
  }

  // Obtenir le token d'accès (version synchrone)
  getTokenSync(): string {
    if (!this.isBrowser) return '';

    try {
      const keycloakInstance = this.keycloakService.getKeycloakInstance();
      return keycloakInstance.token || '';
    } catch (error) {
      console.error('Erreur lors de la récupération du token sync:', error);
      return '';
    }
  }

  // Obtenir les informations utilisateur
  async getUserInfo(): Promise<KeycloakProfile | null> {
    if (!this.isBrowser) return null;

    try {
      if (this.keycloakService.isLoggedIn()) {
        const profile = await this.keycloakService.loadUserProfile();
        this.userProfileSubject.next(profile);
        return profile;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      return null;
    }
  }

  // Obtenir le nom d'utilisateur
  getUsername(): string {
    if (!this.isBrowser) return '';

    try {
      return this.keycloakService.getUsername();
    } catch (error) {
      console.error('Erreur lors de la récupération du nom d\'utilisateur:', error);
      return '';
    }
  }

  // Obtenir les rôles de l'utilisateur
  getUserRoles(allRoles: boolean = true): string[] {
    if (!this.isBrowser) return [];

    try {
      return this.keycloakService.getUserRoles(allRoles);
    } catch (error) {
      console.error('Erreur lors de la récupération des rôles:', error);
      return [];
    }
  }

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    if (!this.isBrowser) return false;

    try {
      return this.keycloakService.isUserInRole(role);
    } catch (error) {
      console.error('Erreur lors de la vérification du rôle:', error);
      return false;
    }
  }

  // Déconnexion
  logout(): Observable<void> {
    if (!this.isBrowser) return of();

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return from(this.keycloakService.logout(origin));
  }

  // Connexion
  login(): Observable<void> {
    if (!this.isBrowser) return of();

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return from(this.keycloakService.login({
      redirectUri: origin + '/dashboard'
    }));
  }

  // Rafraîchir le token
  refreshToken(): Observable<boolean> {
    if (!this.isBrowser) return of(false);

    return from(this.keycloakService.updateToken(30));
  }

  // Vérifier si le token est expiré
  isTokenExpired(): boolean {
    if (!this.isBrowser) return true;

    try {
      return this.keycloakService.isTokenExpired();
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return true;
    }
  }

  // Obtenir le token parsé
  getTokenParsed(): any {
    if (!this.isBrowser) return null;

    try {
      return this.keycloakService.getKeycloakInstance().tokenParsed;
    } catch (error) {
      console.error('Erreur lors de la récupération du token parsé:', error);
      return null;
    }
  }

  // Observable pour le token
  getToken$(): Observable<string> {
    if (!this.isBrowser) return of('');
    return from(this.getToken());
  }

  async logoutWithRedirect(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      console.log('Déconnexion avec redirection...');

      // Déconnecter de Keycloak avec redirection vers la page de connexion
      await this.keycloakService.logout(window.location.origin);

    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);

      // En cas d'erreur, forcer la redirection manuelle
      if (typeof window !== 'undefined') {
        const logoutUrl = `http://localhost:8080/realms/gestion-habilitation/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(window.location.origin)}`;
        window.location.href = logoutUrl;
      }
    }
  }
}