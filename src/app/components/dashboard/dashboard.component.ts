
import { ParamformComponent } from '../paramform/paramform.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AjouterComponent } from '../ajouter/ajouter.component';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudModel } from './crud.model';
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
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService],
  standalone: false
})
export class DashboardComponent implements OnInit {
  headerajouter: string = "PARAEMTRAGE D'UN FONCTION";
  headerajouterapplication: string = 'AJOUTER APPLICATION ET MODULE';

  formValue!: FormGroup;
  CrudModelobj: Fonctionmodel = new Fonctionmodel();
  CrudModelobjapplic: Applicationmodel = new Applicationmodel();

  employeeData: Fonctionmodel[] = [];
  employeeDataapplication: Applicationmodel[] = [];

  searchValue: string;
  loading: boolean = false;
  selectedItem: any = null;
  // infoappmofon: AddmodFonctionmodel = {appId: -1, fonctionId: -1,moduleIds:[] };

  info: any = {};
  infoapplication: any = {};

  public usersmeme: any[] = [];
  public usersmeme1: any[] = [];

  public usersme: any[] = [];
  public usersme1: any[] = [];

  public a_valuee: boolean;
  public saveUsername: boolean;
  public yourDate: Date;
  public segchoisir: string;
  public creditchoisir: string;

  mySelectmeme: string;
  selectedValuememe: any;
  mySelectmeme1: string;
  selectedValuememe1: any;
  mySelectme: string;
  selectedValueme: any;
  public val1: string;
  public val2: string;
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private api: ConsultService, public dialog: MatDialog, private dialogService: DialogService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private router: Router) { }

  ngOnInit(): void {

    this.onSaveUsernameChanged(this.info.value);
    this.getmeme();
    this.getmeme1();
    this.getAllEmployee();
    this.getAllApplication();

    this.formValue = this.formBuilder.group({})
    //  this.info.actif = false;
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;
    if (this.config.data != null && this.config.data != undefined) this.infoapplication = this.config.data.obj;

  }
  public onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
    console.log("i loc" + this.saveUsername)
  }

  getmeme() {
    this.api.getAllfonction().subscribe(res =>
      this.usersmeme = res);
  }

  getmeme1() {
    this.api.getAllapplicationapi().subscribe(res =>
      this.usersmeme1 = res);
  }

  selectChangememe() {
    console.log("code categie of segment selected is", this.mySelectmeme)
    this.api.getAllfonction().subscribe(res =>
      this.usersme = res)
    this.val1 = this.mySelectmeme;
    console.log("TABLE  " + this.val1)
  }


  selectChangememe1() {
    console.log("APPLICATION selected is", this.mySelectmeme1)
    this.api.getAllapplicationapi().subscribe(res =>
      this.usersme = res)
    this.val2 = this.mySelectmeme1;
    console.log("APPLICATION1  " + this.val1)
  }


  selectChangeme() {
    // console.log("code categie of credit selected is", this.mySelectme)
    // console.log("dddd",this.usersme.find(v => v.code == this.mySelectme).libelle)
    // console.log("codeCategorie EST",this.usersme.find(v => v.code == this.mySelectme).codeCategorie)
    // console.log("first value"+this.mySelectme);
    console.log("second value ty cred " + this.usersme.find(v => v.code == this.mySelectme).libelle);
    this.creditchoisir = this.usersme.find(v => v.code == this.mySelectme).libelle;
    this.selectedValueme = this.api.getDropDownTextme(this.mySelectme, this.usersme);
    console.log("zddd" + this.mySelectme)

  }
  onCheckAmortissable(e: MatCheckboxChange) {
    this.a_valuee = e.checked;
    console.log("checkedddd" + this.a_valuee)
  }
  getcorresty() {
    console.log("i am herrrrrr" + this.val1)
    this.api.getAllapplicationapi()
      .subscribe(res => {
        this.employeeData = res;
        console.log("RESSSSSDD" + this.employeeData)
      })

  }


  searchfonction(info) {
    info.fnom = this.val1;
    console.log("info.fnom" + info.fnom)
    this.api.getsingleFonctionList(info.fnom)
      .subscribe(res => {
        this.employeeData = res;

      },
        err => {
          alert('error')

        })
  }

  searchapplication(infoapplication) {
    infoapplication.nom = this.val2;
    console.log("info.nom" + infoapplication.nom)
    this.api.getsingleApplication(infoapplication.nom)
      .subscribe(res => {
        this.employeeDataapplication = res;

      },
        err => {
          alert('error')

        })
  }



  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  getAllApplication() {
    this.api.getAllapplicationapi()
      .subscribe(res => {
        this.employeeDataapplication = res;
      })

  }



  onView(obj) {
    let data = obj;
    const ref = this.dialogService.open(ParamformComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'INFORMATION SUR FONCTION',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {

    })
  }
  searchForm(info) {
    this.newMethod(info);

    if (info.debut > info.fin) {
      alert("Alert Date Debut ne peux pas etre plus que date de fin")
      return

    }
    if (info.debut != null || info.fin != null) {
      info.debut.setDate(info.debut.getDate() + 1);
      info.fin.setDate(info.fin.getDate() + 1);
    }
    info.segment = this.segchoisir;
    info.typeCredit = this.creditchoisir;
    // info.amortissable= this.saveUsername;
    // info.actif=true;
    console.log("DATE IS" + info.fin)
    if (info.reference == null)
      console.log("NULL" + info.reference)
    this.api.getSrchControleSeuil(info)
      .subscribe(res => {
        this.employeeData = res.datas;
        this.formValue.reset();


      },
        err => {
        })
  }

  private newMethod(info: any) {
    console.log("DATE debut " + info.debut);
    console.log("DATE debut " + info.actif);
    console.log("segment segment " + this.mySelectmeme);
  }

  addBlack() {
    this.getAllEmployee();
    const ref = this.dialogService.open(AjouterComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: this.headerajouter,
    });
    ref.onClose.subscribe(res => {

    })
  }

  addApplicat() {
    this.getAllEmployee();
    const ref = this.dialogService.open(AjouterapplicationComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: this.headerajouterapplication,
    });
    ref.onClose.subscribe(res => {

    })
  }

  onEditmat(obj) {
    let data = obj;
    const ref = this.dialogService.open(EditformComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'EDITER',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  }

  onEditmatapplication(obj) {
    let data = obj;
    const ref = this.dialogService.open(EditformapplicationComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'EDITER',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  }

  onDeletemat(obj) {
    let data = obj;
    const ref = this.dialogService.open(DeleteComponent, {
      closeOnEscape: false,
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {

    })

  }

  logout() {
    this.router.navigate(['login'])
    localStorage.clear();
  }




}

