import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrudModel } from '../dashboard/crud.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';
// import { AfbcoreService } from 'afbcore';
@Component({
  selector: 'app-ajouterspecific',
  templateUrl: './ajouterspecific.component.html',
  styleUrls: ['./ajouterspecific.component.css'],
  standalone: false
})
export class AjouterspecificComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  filteredOptions: Observable<string[]>;
  filteredOptionsme: Observable<string[]>;
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: CrudModel;
  info: any = {};
  infofunction: any = {};

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
    this.formValue = this.formBuilder.group({})
    this.getmeme();
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;
 this.getAllfonction();
 this.getAllapplication();

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.chosenstring= filterValue;
    console.log("filterValue focntion",this.chosenstring);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filterme(value: string): string[] {
    const filterValue = value;
    this.chosenstringappli= filterValue;
    console.log("filterValue application",this.chosenstringappli);
    this.info.nom=filterValue;
    this.api.getsingleApplication(this.info.nom)
      .subscribe(res => {
        this.optionsmodule = [];
        for (let i of res[0].modules) {
          this.optionsmodule.push(i.mnom);
        }
        this.toppings.setValue([...this.optionsmodule])
        console.log("res[0].modules 1", this.optionsmodule);
        this.getAllmodule();
       
      },
        err => {
          // alert('error')

        })
    return this.optionsme.filter(option => option.toLowerCase().includes(filterValue));
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


  getAllapplication() {
    this.api.getAllapplicationapi()
      .subscribe(res => {
        this.optionsme = [];
        for (let i of res) {
          this.optionsme.push(i.nom);
        }
        this.filteredOptionsme = this.myControlme.valueChanges.pipe(
          startWith(''),
          map(value => this._filterme(value)),
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

  postFonction() {
    if(this.info.fnom== null){
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('DANGER', 'Le champ Fonction est vide!');
      alert('Le champ Fonction est vide!');

      //alert("Le champ Fonction est vide!")
      return;
    }
    console.log("info info is",this.info);
    this.api.postfonction(this.info)
    .subscribe(res => {
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('SUCCESS', 'Fonction  ajouté avec Success');
      alert('Fonction  ajouté avec Success');

   //   alert("Fonction  ajouté avec Success")
      window.location.reload();
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
        console.log("response date os",res)
        this.employeeData = res;
      })
  }
}
