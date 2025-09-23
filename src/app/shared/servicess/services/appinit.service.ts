import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShareService } from './share.service';
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
    private http: HttpClient

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
        // Configuration temporaire pour le développement
        //this.service.apiHost = "http://localhost:8080/gestionhabilitation-service/rest/api";
        this.service.apiHost = "http://192.168.11.75:9001/gestionhabilitation-service/api/v1";
        console.log("NOST API IS", this.service.apiHost)
        this.url = "http://192.168.11.75:9001";
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
