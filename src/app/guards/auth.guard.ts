import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    
    console.log('AuthGuard - Plateforme:', this.isBrowser ? 'Browser' : 'Server');
    
    // En mode SSR, permettre l'accès (la vérification se fera côté client)
    if (!this.isBrowser) {
      console.log('Mode SSR - Accès autorisé temporairement');
      return true;
    }

    console.log('AuthGuard - Vérification de l\'authentification...');
    
    try {
      // Attendre un peu que Keycloak soit initialisé si nécessaire
      let attempts = 0;
      while (attempts < 10) {
        try {
          const isLoggedIn = this.keycloakService.isLoggedIn();
          console.log('Utilisateur connecté:', isLoggedIn);
          
          if (!isLoggedIn) {
            console.log('Utilisateur non connecté, redirection vers Keycloak...');
            
            // Vérification supplémentaire que window existe
            if (typeof window !== 'undefined') {
              await this.keycloakService.login({
                redirectUri: window.location.origin + state.url
              });
            } else {
              console.error('Window non disponible pour la redirection');
              return false;
            }
            return false;
          }

          // Vérifier les rôles requis
          const requiredRoles = route.data?.['roles'] as Array<string>;
          
          if (requiredRoles && requiredRoles.length > 0) {
            const userRoles = this.keycloakService.getUserRoles();
            console.log('Rôles requis:', requiredRoles);
            console.log('Rôles utilisateur:', userRoles);
            
            const hasRequiredRole = requiredRoles.some(role => 
              this.keycloakService.isUserInRole(role)
            );
            
            if (!hasRequiredRole) {
              console.log('Rôles insuffisants, redirection vers dashboard');
              this.router.navigate(['/dashboard']);
              return false;
            }
          }

          console.log('Accès autorisé');
          return true;
          
        } catch (initError) {
          console.log('Keycloak pas encore initialisé, attente...');
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
      }
      
      console.error('Keycloak non initialisé après plusieurs tentatives');
      return false;
      
    } catch (error) {
      console.error('Erreur dans AuthGuard:', error);
      
      // En cas d'erreur, essayer de se connecter si on est dans le navigateur
      if (this.isBrowser && typeof window !== 'undefined') {
        try {
          await this.keycloakService.login();
        } catch (loginError) {
          console.error('Erreur lors de la tentative de connexion:', loginError);
        }
      }
      return false;
    }
  }
}