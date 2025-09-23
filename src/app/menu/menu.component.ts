import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ConsultService } from '../shared/servicess/services/consult.service';
import { BehaviorSubject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false
})
export class MenuComponent implements OnInit {

  isLogged  = new BehaviorSubject(true);
  userProfile: any = null;

  constructor(
    private permissionsService: NgxPermissionsService,
    private share: ConsultService,
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  async ngOnInit() {
    try {
      this.userProfile = await this.keycloakService.loadUserProfile();
    } catch (error) {
      console.error('Erreur lors du chargement du profil utilisateur:', error);
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.keycloakService.logout(window.location.origin);
  }

}

