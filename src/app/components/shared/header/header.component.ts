import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string = '';
  userFullName: string = '';
  userEmail: string = '';
  userRoles: string[] = [];
  isAuthenticated: boolean = false;
  userProfile: KeycloakProfile | null = null;
  private isBrowser: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit(): Promise<void> {
    if (!this.isBrowser) return;

    // Vérifier l'authentification
    this.checkAuthentication();
    
    // Charger les informations utilisateur si connecté
    if (this.isAuthenticated) {
      await this.loadUserInfo();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private checkAuthentication(): void {
    try {
      this.isAuthenticated = this.authService.isLoggedIn();
      console.log('État d\'authentification:', this.isAuthenticated);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      this.isAuthenticated = false;
    }
  }

  private async loadUserInfo(): Promise<void> {
    try {
      // Récupérer le nom d'utilisateur
      this.username = this.authService.getUsername();
      
      // Récupérer les rôles
      this.userRoles = this.authService.getUserRoles();
      
      // Récupérer le profil complet
      if (this.keycloakService.isLoggedIn()) {
        this.userProfile = await this.keycloakService.loadUserProfile();
        
        if (this.userProfile) {
          // Construire le nom complet
          this.userFullName = this.buildFullName(this.userProfile);
          this.userEmail = this.userProfile.email || '';
          
          console.log('Profil utilisateur chargé:', {
            username: this.username,
            fullName: this.userFullName,
            email: this.userEmail,
            roles: this.userRoles
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des informations utilisateur:', error);
    }
  }

  private buildFullName(profile: KeycloakProfile): string {
    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else {
      return this.username; // Fallback sur le username
    }
  }

  // Méthode de déconnexion
  async logout(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      console.log('Déconnexion en cours...');
      
      // Afficher un message de confirmation (optionnel)
      const confirmLogout = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
      if (!confirmLogout) {
        return;
      }

      // Déconnecter de Keycloak
      await this.keycloakService.logout(window.location.origin);
      
      console.log('Déconnexion réussie');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      
      // En cas d'erreur, forcer la redirection vers Keycloak
      if (typeof window !== 'undefined') {
        window.location.href = 'http://localhost:8080/realms/gestion-habilitation/protocol/openid-connect/logout?redirect_uri=' + 
                              encodeURIComponent(window.location.origin);
      }
    }
  }

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    return this.authService.hasRole('admin') || this.authService.hasRole('ADMIN');
  }

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  // Obtenir un nom d'affichage approprié
  getDisplayName(): string {
    if (this.userFullName) {
      return this.userFullName;
    } else if (this.username) {
      return this.username;
    }
    return 'Utilisateur';
  }

  // Obtenir les initiales pour l'avatar
  getInitials(): string {
    if (this.userProfile?.firstName && this.userProfile?.lastName) {
      return `${this.userProfile.firstName.charAt(0)}${this.userProfile.lastName.charAt(0)}`.toUpperCase();
    } else if (this.username) {
      return this.username.substring(0, 2).toUpperCase();
    }
    return 'U';
  }
}