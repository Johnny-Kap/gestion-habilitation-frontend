import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrudModel } from '../dashboard/crud.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddmodFonctionmodel } from 'src/app/model/AddmodFonction.model';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';
// import { AfbcoreService } from 'afbcore';
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css'],
  standalone: false
})
export class AjouterComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = [];

  filteredOptions: Observable<string[]>;
  filteredOptionsme: Observable<string[]>;
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: CrudModel;
  AddmodFonctionobj: AddmodFonctionmodel = new AddmodFonctionmodel();
  infoappmofon: AddmodFonctionmodel = { appId: -1, fonctionId: -1, moduleIds: [] };
  info: any = {};
  infofunction: any = {};
  public usersmeme1: any[] = [];
  public moduleset: any[] = [];
  public usermodules: string[] = [];
  mySelectApplication: String;
  mySelectApplicationint: number;
  public code_: string;
  public codecat: string;
  public codeCategorie: string;
  public val1: string;
  public users: any;
  public usersme: any[] = [];
  public usersmeme: any[] = [];
  public saveUsername = false;
  public a_valuee: boolean;
  public electricity = "";
  public checkamort = "";
  public chosenstring = "";
  public chosenstringappli = "";
  public idfonctin: number;
  mySelect = [];
  selectedValue: any;
  mySelectme: string;
  selectedValueme: any;
  mySelectmeme: string;
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
  constructor(private formBuilder: FormBuilder,/* private afbcore: AfbcoreService, */
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private api: ConsultService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({})
    this.getmeme();
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;
    this.getAllfonction();
    //  this.getAllapplication();

  }


  selectChangememe1() {
    this.mySelectApplicationint = Number(this.mySelectApplication);
    console.log("App ", this.mySelectApplication);

    this.api.getsingleFonction(this.chosenstring).subscribe(res => {
      this.moduleset = res;
      console.log("fiddd", res.fonctionId)
      this.idfonctin = res.fonctionId
      //@ts-ignore
      let modules = this.moduleset.modules.filter((e) => e.application != null && e.application.appId == this.mySelectApplication)
      this.usermodules = modules.map(m => m.moduleId)
      console.log("module set GOOD", this.usermodules)

      console.log("MODULE USER PER APPLICATION", JSON.stringify(this.usermodules))
    },
      err => { })

    this.api.getCorrespondmodperapp(this.mySelectApplicationint)
      .subscribe(res => {
        this.optionsmodule = res;
        console.log("Modules : ", this.optionsmodule);
        this.getmodperap();


        this.toppings.setValue([...this.optionsmodule])
        console.log("MODULES 1 ARE", this.toppings);

        console.log("MODULES PER APPLICATION", JSON.stringify(this.optionsmodule));
        this.getAllmodule();

      },
        err => {
          // alert('error')

        })
    // return this.optionsme.filter(option => option.toLowerCase().includes(filterValue));

  }

  onUserModulesChange(value: any) {
    this.usermodules = value;
    console.log("foandkjdodddlodo", this.usermodules)
  }

  getmeme1() {
    this.api.getAllapplicationapi().subscribe(res =>
      this.usersmeme1 = res);
  }


  getmodperap() {


  }
  private _filter(value: string): string[] {
    const filterValue = value;
    this.chosenstring = filterValue;
    console.log("filterValue focntion", this.chosenstring);
    return this.options.filter(option => option.includes(filterValue));
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
        this.getmeme1();
        this.formValue = this.formBuilder.group({
        })
      })
  }


  // getAllapplication() {
  //   this.api.getAllapplicationapi()
  //     .subscribe(res => {
  //       this.optionsme = [];
  //       for (let i of res) {
  //         this.optionsme.push(i.nom);
  //       }
  //       this.filteredOptionsme = this.myControlme.valueChanges.pipe(
  //         startWith(''),
  //         map(value => this._filterme(value)),
  //       );
  //       this.formValue = this.formBuilder.group({
  //       })
  //     })
  // }


  selectChangeme() {
    console.log("NOE S", this.usersme.find(v => v.code == this.mySelectme).val2);
    this.checkamort = this.usersme.find(v => v.code == this.mySelectme).val2;
    this.code_ = this.mySelectme;
    this.codecat = this.usersme.find(v => v.code == this.mySelectme).codeCategorie;
    this.selectedValueme = this.api.getDropDownTextme(this.mySelectme, this.usersme);
    console.log("zddd" + this.mySelectme)

  }
  getmeme() {
    this.api.getUsersmeme().subscribe(res =>
      this.usersmeme = res);
    console.log("return is  ", JSON.stringify(this.usersmeme))
  }
  foncGet() {
    console.log("my Selected", this.chosenstring)
  }
  appliGet() {

    console.log("my Selected application", this.chosenstringappli)

  }

  refresh(): void {
    window.location.reload();
  }
  onNoClick(): void {
    this.ref.close();
  }

  postApplication() {

    //@ts-ignore
    this.infoappmofon.appId = this.mySelectApplication;
    this.infoappmofon.fonctionId = this.idfonctin;
    this.infoappmofon.moduleIds = this.usermodules;


    this.api.postfonctionApplimodule(this.infoappmofon)
      .subscribe(res => {
        // TODO: Remplacer par la nouvelle méthode de notification
        // this.afbcore.showMessage('SUCCESS', 'Habilitation octroyess avec Success');
        alert('Habilitation octroyess avec Success');

        //  alert("Habilitation octroyess avec Success")
        let ref = document.getElementById('cancel');
        this.ref.close();
        this.getAllEmployee();
      },
        err => {
          // TODO: Remplacer par la nouvelle méthode de notification
          // this.afbcore.showMessage('DANGER', 'Données existent deja ou bein Vides!');
          alert('Données existent deja ou bein Vides!');

          //  alert("Données existent deja ou bein Vides!");

        })
  }


  postEmployeeDetails(info) {

    console.log("finalselcted are", this.toppings.value);
    if (info.valeur > 100) {
      alert("Valuer ne peux pas etre plus de 100%!")
      return
    }
    if (info.valeur < 0) {
      alert("Valuer ne peux pas etre moins de 0!")
    }
    else {
      if (this.checkamort === "AMORTISSABLE") {
        info.amortissable = true;
      }
      else {
        info.amortissable = false;

      }
      info.reference = this.mySelectme + this.mySelectmeme;
      info.actif = true;
      info.typeCredit = this.usersme.find(v => v.code == this.mySelectme).libelle
      info.segment = this.usersmeme.find(v => v.code == this.mySelectmeme).libelle
      info.utiCreation = "NOE"
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
