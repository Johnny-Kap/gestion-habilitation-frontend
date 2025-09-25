import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpClientModule, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import { AppinitService } from './appinit.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  
  public URL_nomen: String="http://192.168.11.75:9001/nomenclature-service/rest/api/nomenclature";
    public URL_cont_se: any="http://192.168.11.75:9001/seuilusure-service/rest/api/controleseuilusure";
    //public URL: any="http://localhost:8080/api/v1";
   public URL: any="http://192.168.11.75:9001/api/v1";

  isLoggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }
  getsingleModule(mnom: string) {
    return this.http.get<any>(AppinitService.globalapi+`/api/v1/getappmodull/${mnom}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteModules(id: number) {
    return this.http.delete<any>(AppinitService.globalapi+"/api/v1/deletemodule/"+id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllModulesapi() {
    return this.http.get<any>(AppinitService.globalapi+"/api/v1/getallmodules")
    .pipe(map((res: any) => {
      return res;
    }))
  }
  updateModuleapi(data: any,id: number) {
    return this.http.put<any>(AppinitService.globalapi+`/api/v1/updatemodule/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateApplication(data: any,id: number) {
    return this.http.put<any>(AppinitService.globalapi+`/api/v1/updateapplication/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateFonction(data: any,id: number) {
    return this.http.put<any>(AppinitService.globalapi+`/api/v1/updatefonction/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  postfonction(data: any) {
    return this.http.post<any>(AppinitService.globalapi+"/api/v1/addfonctions", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  postapplication(data: any) {
    return this.http.post<any>(AppinitService.globalapi+"/api/v1/addapplication", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  postmodule(data: any) {
    return this.http.post<any>(AppinitService.globalapi+"/api/v1/ajoutappmodule", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  
  postfonctionApplimodule(data: any) {
    return this.http.post<any>(AppinitService.globalapi+"/api/v1/ajoutfonctionappmodule", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  postApplimodule(data: any) {
    return this.http.post<any>(AppinitService.globalapi+"/api/v1/addapplicationmodule", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllapplicationapi() {
    return this.http.get<any>(AppinitService.globalapi+"/api/v1/getallapplication")
    .pipe(map((res: any) => {
      return res;
    }))
  }
  getAllmoduleapi() {
    return this.http.get<any>(AppinitService.globalapi+"/api/v1/getallmodules")
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getUsersme() {
    return this.http.get<any>(this.URL_nomen+"/api/v1/findbycategorie/012")
    .pipe(map((res: any) => {
      return res.datas;
    }))
  }

  getsingleFonction(fnom: string) {
    return this.http.get<any>(AppinitService.globalapi+`/api/v1/getappfonction/${fnom}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getsingleFonctionList(fnom: string) {
    return this.http.get<any>(AppinitService.globalapi+`/api/v1/getappfonctionList/${fnom}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getsingleApplication(nom: string) {
    return this.http.get<any>(AppinitService.globalapi+`/api/v1/getspecificapp/${nom}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getCorrespondmodperapp(id: number) {
    return this.http.get<any>(AppinitService.globalapi+`/api/v1/gettallapi/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllfonction() {
    return this.http.get<any>(AppinitService.globalapi+"/api/v1/getallfonction")
      .pipe(map((res: any) => {
        return res;
      }))
  }



  
  getDropDownTextme(id, object){
    const selObj = _.filter(object, function (o) {
      console.log("id is "+id)
        return (_.includes(id,o.id));
    });
    return selObj;
  }


  getUsersmeme() {
    return this.http.get<any>(this.URL+"/findbycategorie/011")
    .pipe(map((res: any) => {
      return res.datas;
    }))
  }

  getDropDownTextmeme(id, object){
    const selObj = _.filter(object, function (o) {
      console.log("id is "+id)
        return (_.includes(id,o.id));
    });
    return selObj;
  }

  getDropDownText(id, object){
    const selObj = _.filter(object, function (o) {
      console.log("id is "+id)
        return (_.includes(id,o.id));
    });
    return selObj;
  }

  postEmploye(data: any) {
    return this.http.post<any>(this.URL_cont_se+"/seuil/add", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getEmployee() {
    return this.http.get<any>(AppinitService.globalapi+"/api/v1/getallfonction")
      .pipe(map((res: any) => {
        return res;
      }))
  }


  getEmployeeTeg() {
    return this.http.get<any>(AppinitService.globalapi+"/api/v1/calculteg/getall")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSegmentapi() {
    return this.http.get<any>(this.URL_nomen+"/findbycategorie/011")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getProjects() {
    return this.http.get<any>(this.URL_nomen+"/findbycategorie/011")
      .pipe(map((res: any) => {
        return res;
      }))
  }

 



  getTypedecredapi() {
    return this.http.get<any>(this.URL_nomen+"/findbycategorie/012")
      .pipe(map((res: any) => {
        return res;
      }))
  }


  getCategorie() {
    return this.http.get<any>(this.URL_nomen+"/findallcodecategorie/")
      .pipe(map((res: any) => {
        return res;
      }))
  }


  getSrch(data: any) {
    return this.http.post<any>(this.URL_cont_se+"/seuil/findseuilusure", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  deleteFonction(id: number) {
    return this.http.delete<any>(AppinitService.globalapi+"/api/v1/deletefonction/"+id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteApplication(id: number) {
    return this.http.delete<any>(AppinitService.globalapi+"/api/v1/deleteappl/"+id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  
//api for calcul teg
  getSrchControleSeuil(data: any) {
    return this.http.post<any>(AppinitService.globalapi+"/seuil/findseuilusure", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSrchControleTeg(data: any) {
    return this.http.post<any>(this.URL_cont_se+"/calculteg/findteg", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  postCalculTeg(data: any) {
    return this.http.post<any>(this.URL_cont_se+"/calculteg/simulation", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  


  getAllControleSeuil() {
    return this.http.get<any>(this.URL_cont_se+"/calculteg/getall")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  
 
  getinfordoc(codecl: string, numerop: string) {
    return this.http.get<any>(`http://192.168.11.75:9001/seuilusure-service/rest/api/controleseuilusure/calculteg/infocredit/${codecl}/${numerop}`)
      .pipe(map((res: any) => {

        return res;
      }))
  }

  getAllHistory() {
    return this.http.get<any>(this.URL_cont_se+"/histoseuil/getall")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getHistorySrchTeg(data: any) {
    return this.http.post<any>(this.URL_cont_se+"/histoseuil/findhistoseuilusure", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  

}
