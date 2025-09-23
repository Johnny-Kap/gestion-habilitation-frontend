import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AfbcoreService } from 'afbcore';
import { environment } from 'src/environments/environment';
import { ShareService } from './shared/servicess/services/share.service';

declare const Liferay: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'seuilusure';
  
  logoPath = '/o/gestionhabilitation-0.0.0/gestionhabilitation/assets/images/logo.png';

  constructor(
    // private afbcore: AfbcoreService,
    private dialog: MatDialog,
    private service: ShareService
   ) {
      // lorsque la page charge nous postons les informations du module dans le BDD liferay

    //this.apimanager.getApiManager();
    // TODO: Remplacer par la nouvelle méthode sans afbcore
    // this.afbcore.postModule(environment.name,
    // environment.name,
    // environment.name, "", this.logoPath,
    // true, "",this.service.permission, Liferay);


   }

   @HostListener('mousemove', ['$event'])
   onMouseMove(event: any) {
     // TODO: Remplacer par la nouvelle méthode de gestion de session
     // if(Liferay.Session.get("sessionState") === 'expired')  this.afbcore.logoutPop();
   }
}
