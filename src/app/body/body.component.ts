import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 // import { AfbcoreService } from 'afbcore';
import { NgxPermissionsService } from 'ngx-permissions';
import { environment } from 'src/environments/environment';
import { ShareService } from '../shared/servicess/services/share.service';

declare const Liferay: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: false
})
export class BodyComponent implements OnInit {

  obj: any;
  logoPath: any;
  roles: any[];
  query: any;
  apiMngLoad: boolean = false;
  queryID: any;
  
  constructor(
    private router: Router,
    private routeParams: ActivatedRoute,
    private service: ShareService,
    private permissionsService: NgxPermissionsService,
    /* private afbcore: AfbcoreService */
  ) { 

    this.postDaata();
    this.routeParams.queryParams.subscribe(params => {
      this.query = params['r']; // recuperaton des roles dans l'url
      this.queryID = params['id']; // recuperation du userID
      this.query = atob(this.query); // decodage des roles present dans l'url
      console.log("fff1"+this.query);
     
      localStorage.setItem('role_gestionhabilitation',this.query); // sauvegarde des roles dans la session
      localStorage.setItem('userId',this.queryID); // sauvegarde du userID dans la session
    });
    //si les roles ne sont pas present dans l'url on recupere les roles dans la session
    if(this.query == undefined || this.query == null) this.query = localStorage.getItem('role_gestionhabilitation');

    this.logoPath = '/assets/images/logo.png';
    let imgUrl = this.logoPath;
  }

  ngOnInit() {
    this.roles = this.service.stringToTable(this.query); // on récupere les roles du user connecté
    this.permissionsService.loadPermissions(this.roles); // on charge les roles du user connecté dans le module
  }

  postDaata() {
     //this.apimanager.getApiManager();
     // TODO: Remplacer par la nouvelle méthode de gestion des modules sans afbcore
     // this.afbcore.postModule(environment.name,
     //   environment.name,
     //   environment.name, "", this.logoPath,
     //   true, "",this.service.permission, Liferay); 
      
  }

}
