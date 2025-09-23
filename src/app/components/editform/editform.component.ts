import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrudModel } from '../dashboard/crud.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Fonctionmodel } from '../../model/Fonction.model';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';
// import { AfbcoreService } from 'afbcore';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css'],
  standalone: false
})
export class EditformComponent implements OnInit {
  formValue!: FormGroup;
  CrudModelobj: Fonctionmodel = new Fonctionmodel();
  employeeData!: Fonctionmodel;
  codeCate! : any;
  isChecked:boolean ;
  readOnlyStyleGuideNotes : boolean;

  info: any = {};
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  myControl = new FormControl();
  options: any[];

  filteredOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private api: ConsultService,
    public ref: DynamicDialogRef, /* private afbcore: AfbcoreService, */
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() :void {
    this.formValue = this.formBuilder.group({
    })
    this.getAllEmployee();

    this.info.actif = false;
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
    console.log("ssss"+this.info.actif);
    this.isChecked =this.info.actif;
    this.readOnlyStyleGuideNotes=true;

  }


  onNoClick(): void {
    this.ref.close();
  }
  postUpdates(info){
    this.api.updateFonction(info,info.fonctionId)
    .subscribe(res=>{
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('SUCCESS', 'Mis à jour avec succès');
      alert('Mis à jour avec succès');

    //  alert("Mis à jour sur fonction avec succès")
      let ref = document.getElementById('cancel');
      this.ref.close();    
       this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('DANGER', 'Erreur lors de la mise à jour!');
      alert('Erreur lors de la mise à jour!');

      //alert("Erreur lors de la mise à jour!");
    } )
}
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
  

}

