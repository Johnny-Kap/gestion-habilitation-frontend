import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected router: Router,
    protected keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + '/#/dashboard'
      });
    }
    return this.authenticated;
  }
}