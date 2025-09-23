import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakDebugService } from '../../services/keycloak-debug.service';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-debug-keycloak',
  template: `
    <div class="container mt-4">
      <h2>🔍 Debug Keycloak</h2>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Configuration</h5>
            </div>
            <div class="card-body">
              <p><strong>URL:</strong> {{ keycloakUrl }}</p>
              <p><strong>Realm:</strong> {{ keycloakRealm }}</p>
              <p><strong>Client ID:</strong> {{ keycloakClientId }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>État</h5>
            </div>
            <div class="card-body">
              <p><strong>Authentifié:</strong> {{ isAuthenticated }}</p>
              <p><strong>Token:</strong> {{ hasToken ? 'Disponible' : 'Indisponible' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <button class="btn btn-primary me-2" (click)="testConnectivity()">
          Tester la Connectivité
        </button>
        <button class="btn btn-secondary me-2" (click)="testInit()">
          Tester l'Initialisation
        </button>
        <button class="btn btn-success me-2" (click)="loginManual()">
          Connexion Manuelle
        </button>
        <button class="btn btn-warning" (click)="clearConsole()">
          Effacer Console
        </button>
      </div>

      <div class="mt-3">
        <div class="alert alert-info">
          <strong>Instructions:</strong>
          <ol>
            <li>Ouvrez la console du navigateur (F12)</li>
            <li>Cliquez sur "Tester la Connectivité" pour vérifier Keycloak</li>
            <li>Regardez les logs dans la console</li>
            <li>Si la connectivité fonctionne, testez l'initialisation</li>
          </ol>
        </div>
      </div>
    </div>
  `,
  standalone: false
})
export class DebugKeycloakComponent implements OnInit {

  keycloakUrl: string = '';
  keycloakRealm: string = '';
  keycloakClientId: string = '';
  isAuthenticated: boolean = false;
  hasToken: boolean = false;

  constructor(
    private keycloakService: KeycloakService,
    private debugService: KeycloakDebugService,
    private envService: EnvironmentService
  ) { }

  async ngOnInit() {
    this.keycloakUrl = this.envService.keycloakUrl;
    this.keycloakRealm = this.envService.keycloakRealm;
    this.keycloakClientId = this.envService.keycloakClientId;

    await this.updateStatus();
  }

  async updateStatus() {
    try {
      this.isAuthenticated = await this.keycloakService.isLoggedIn();
      this.hasToken = !!this.keycloakService.getToken();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  }

  async testConnectivity() {
    console.clear();
    await this.debugService.debugKeycloakConnection();
  }

  async testInit() {
    console.clear();
    await this.debugService.testKeycloakInit();
    await this.updateStatus();
  }

  async loginManual() {
    try {
      console.log('🔑 Tentative de connexion manuelle...');
      await this.keycloakService.login({
        redirectUri: window.location.origin + '/#/debug-keycloak'
      });
    } catch (error) {
      console.error('❌ Erreur de connexion manuelle:', error);
    }
  }

  clearConsole() {
    console.clear();
    console.log('🧹 Console effacée');
  }
}