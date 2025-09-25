
import { ParamformComponent } from '../paramform/paramform.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AjouterComponent } from '../ajouter/ajouter.component';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditformComponent } from '../editform/editform.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { DeleteComponent } from '../delete/delete.component';
import { DatePipe } from '@angular/common'
import * as FileSaver from 'file-saver';
import { Fonctionmodel } from '../../model/Fonction.model';
import { Applicationmodel } from '../../model/Application.model';
import { AjouterapplicationComponent } from '../ajouterapplication/ajouterapplication.component';
import { EditformapplicationComponent } from '../editformapplication/editformapplication.component';
import { CrudModel } from '../dashboard/crud.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { state } from '@angular/animations';
import { Applicmodulemodel } from '../../model/Applicmodule.model';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';
// import { AfbcoreService } from 'afbcore';
@Component({
  selector: 'app-dashboardsimulation',
  templateUrl: './dashboardsimulation.component.html',
  styleUrls: ['./dashboardsimulation.component.css'],
  standalone: false
})
export class DashboardsimulationComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = [];
  public usersmeme1: any[] = [];
  mySelectmeme1: string;
  mySelectApplication: string;
  filteredOptions: Observable<string[]>;
  filteredOptionsme: Observable<string[]>;
  formValue!: FormGroup;
  CrudModelobj: Applicationmodel = new Applicationmodel();
  Ajoutmodule: Applicmodulemodel = new Applicmodulemodel();

  employeeData!: Applicationmodel;
  info: any = {};
  infomodule: any = {};
  public state= false;
  public modid: number;
  public code_ :string;
  public codecat :string;
  public codeCategorie :string;
  public val1 :string;
  public users: any;
  public usersme : any[]= [];
  public usersmeme: any[]= [];
  public saveUsername= false;
  public a_valuee : boolean;
  public electricity = "";
  public checkamort= "";
  public chosenstring= "";
  public chosenstringappli= "";
  mySelect = [];
  selectedValue: any;
  mySelectme : string;
  selectedValueme: any;
  mySelectmeme : string;
  selectedValuememe: any;
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  myControl = new FormControl();
  options: any;
  optionsme: any;
  optionsall: any;

  optionsmodule: any;

  myControlme = new FormControl();
  constructor(private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,/* private afbcore: AfbcoreService, */
    public config: DynamicDialogConfig, private api: ConsultService, public dialog: MatDialog) { }
  ngOnInit(): void {
    // Initialisation explicite
    this.mySelectmeme1 = '';
    this.usersmeme1 = [];

    this.formValue = this.formBuilder.group({})
    this.getmeme();
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;
    if (this.config.data != null && this.config.data != undefined) this.infomodule = this.config.data.obj;
    this.getAllfonction();
    this.getmeme1();

    console.log("ngOnInit - mySelectmeme1 initialisé:", this.mySelectmeme1);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.chosenstring= filterValue;
    console.log("filterValue focntion",this.chosenstring);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  getmeme1() {
    this.api.getAllapplicationapi().subscribe(res => {
      this.usersmeme1 = res;
      console.log("Applications chargées:", this.usersmeme1);

      // Debug détaillé de la structure des données
      this.usersmeme1.forEach((app, index) => {
        console.log(`Application ${index}:`, app);
        console.log(`- appId:`, app.applicationId);
        console.log(`- appNom:`, app.appNom);
        console.log(`- Toutes les propriétés:`, Object.keys(app));
      });
    });
  }


  selectChangememe1(event?: any){
    console.log("Event selectChangememe1 déclenché!");
    console.log("Event data:", event);
    console.log("Event target:", event.target);
    console.log("Event target value:", event.target.value);
    console.log("Event target selectedIndex:", event.target.selectedIndex);
    console.log("Event target options:", event.target.options);

    if(event.target.options && event.target.selectedIndex >= 0) {
      const selectedOption = event.target.options[event.target.selectedIndex];
      console.log("Selected option:", selectedOption);
      console.log("Selected option value:", selectedOption.value);
      console.log("Selected option text:", selectedOption.text);
    }

    // Récupérer la valeur depuis l'événement
    const selectedValue = event.target.value;
    this.mySelectmeme1 = selectedValue;

    console.log("Valeur récupérée de l'événement:", selectedValue);
    console.log("Application sélectionnée - ID:", this.mySelectmeme1);
    console.log("usersmeme1 data:", this.usersmeme1);

    if(this.usersmeme1 && this.usersmeme1.length > 0 && this.mySelectmeme1) {
      console.log("Application sélectionnée - Objet:", this.usersmeme1.find(app => app.appId == this.mySelectmeme1));
    } else {
      console.log("usersmeme1 est vide ou mySelectmeme1 est vide");
    }
  }
  

  getAllmodule() {
    this.api.getAllmoduleapi()
      .subscribe(res => {
        this.optionsall = [];
        for (let i of res) {
          this.optionsall.push(i.mnom);
        }
        this.formValue = this.formBuilder.group({
        })
      })
  }


  getAllfonction() {
    this.api.getAllfonction()
      .subscribe(res => {
        this.options = [];
        for (let i of res) {
          this.options.push(i.fnom);
        }
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
        this.formValue = this.formBuilder.group({
        })
      })
  }




  selectChangeme() {
    console.log("NOE S",this.usersme.find(v => v.code == this.mySelectme).val2);
    this.checkamort=this.usersme.find(v => v.code == this.mySelectme).val2;
    this.code_=this.mySelectme;
    this.codecat= this.usersme.find(v => v.code == this.mySelectme).codeCategorie;
    this.selectedValueme = this.api.getDropDownTextme(this.mySelectme, this.usersme);
    console.log("zddd"+this.mySelectme)

  }
  getmeme() {
    this.api.getUsersmeme().subscribe(res =>
      this.usersmeme = res);
    console.log("return is  ", this.usersmeme)
  }
  foncGet(){
    console.log("my Selected",this.chosenstring)
  }
  appliGet(){

    console.log("my Selected application",this.chosenstringappli)

  }

  refresh(): void {
    window.location.reload();
  }
  onNoClick(): void {
    this.ref.close();
  }

  postApplication(info) {
    this.infomodule.mnomm=info.mnom;

    if(!this.mySelectmeme1){
      alert('Veuillez sélectionner une application');
      return;
    }

    this.infomodule.applicationIdss = this.mySelectmeme1;
    console.log("INFORMATION",this.infomodule)
    this.api.postmodule(this.infomodule)
    .subscribe(res => {
      console.log("ressp",res.moduleId)
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('SUCCESS', 'Module  ajouté avec Success');
      alert('Module  ajouté avec Succès');

     //alert("Module  ajouté avec Success")
     window.location.reload();
    },
      err => {
        // TODO: Remplacer par la nouvelle méthode de notification
        // this.afbcore.showMessage('DANGER', 'Module Exist Deja!');
        alert('Module Exist Deja!');

        //alert("Module Exist Deja!");
        return 0;
      })
  }
postApplicationmodule(){
  this.info.moduleIds=this.modid;
  this.info.fonctionId=9;
    this.api.postfonctionApplimodule(this.info)
    .subscribe(res => {
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('SUCCESS', 'Module ajouté dans Application avec Success');
      alert('Module ajouté dans Application avec Success');

    //  alert("Module ajouté dans Application avec Success")
      let ref = document.getElementById('cancel');
      this.ref.close();
      this.getAllEmployee();
    },
      err => {
        // TODO: Remplacer par la nouvelle méthode de notification
        // this.afbcore.showMessage('DANGER', 'Données existent deja ou bein Vides!');
        alert('Données existent deja ou bein Vides!');

    //    alert("Données existent deja ou bein Vides!");

      })
    
}

  postEmployeeDetails(info) {

    console.log("finalselcted are", this.toppings.value);
    if(info.valeur > 100) {
    alert("Valuer ne peux pas etre plus de 100%!")
    return
  }
  if(info.valeur < 0) {
    alert("Valuer ne peux pas etre moins de 0!")
  }
else{
  if(this.checkamort ==="AMORTISSABLE"){
    info.amortissable = true;
  }
  else{
    info.amortissable = false;

  }
    info.reference = this.mySelectme+this.mySelectmeme;
    info.actif = true;
  info.typeCredit=this.usersme.find(v => v.code == this.mySelectme).libelle
  info.segment=this.usersmeme.find(v => v.code == this.mySelectmeme).libelle
info.utiCreation="NOE"
    this.api.postEmploye(info)
      .subscribe(res => {
        alert("seuil d'usure ajouté avec Success")
        let ref = document.getElementById('cancel');
        this.ref.close();
        this.getAllEmployee();
        // window.location.reload();


      },
        err => {
          alert("Données existent deja ou bein Vides!");

        })
  }
}

  searchForm(info) {
    info.actif = "true";
    this.api.getSrch(info)
      .subscribe(res => {
        this.employeeData = res.datas;
        this.formValue.reset();
      },
        err => {
        })
  }
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
}
