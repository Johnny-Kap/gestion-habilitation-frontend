import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShareService } from './share.service';
import { EnvironmentService } from '../../../services/environment.service';
// import { AfbcoreService } from 'afbcore';
@Injectable({
  providedIn: 'root'
})
export class AppinitService {
  url: any;
public static globalapi;
  constructor(
    // private afbcore: AfbcoreService,
    private service: ShareService,
    private http: HttpClient,
    private environmentService: EnvironmentService

  ) { }

  init() {
    let url = null;
    let headers = new HttpHeaders();

    this.getLiferayusers();
    this.getLiferayconnectuser();

    // TODO: Remplacer par la configuration appropriée sans afbcore
    // headers = headers.set("Authorization", "Basic " + btoa(this.afbcore.userName + ":" + this.afbcore.password))
    return new Promise<void>((resolve,reject) =>
      {
        // Configuration depuis assets/env.js
        const apiBaseUrl = this.environmentService.apiBaseUrl;
        this.service.apiHost = apiBaseUrl;
        console.log("NOST API IS", this.service.apiHost)
        // Extraire l'URL de base (sans /api)
        this.url = apiBaseUrl.replace('/api', '');
        AppinitService.globalapi = this.url;
        this.service.apiGED = "http://localhost:8080/ged";

        resolve();

        /* Original code with afbcore dependency - commented out
        this.http.get("/api/jsonws/afbliferayservice.afbparamgeneraux/get-afb-param-generauxs", { headers: headers })
        .toPromise()
        .then(
          (res: any) => {
            this.service.apiHost = res[0].adresseIP + "/gestionhabilitation-service/rest/api";
            console.log("NOST API IS",this.service.apiHost)
            this.url = res[0].adresseIP;
            AppinitService.globalapi=this.url;
            this.service.apiGED = res[0].adresseGedProcess;
          resolve(res);
          }
        )
        .catch(
          error => {
            console.log('INITIALIZER FAILED')
          }
        )
        */
      }
    )
  }
  getLiferayusers() {
    this.service.getUsers()
      .subscribe(res => {
      // console.log("USERNAME from liferay1 IS "+JSON.stringify(res))
     
      })
  }

  getLiferayconnectuser() {
    this.service.loadAll()
      .subscribe(res => {
        console.log("USERNAME from liferay2 IS "+res[0].screenname)
        console.log("USERNAME from liferay22 IS "+JSON.stringify(res))

      })
  }
}
