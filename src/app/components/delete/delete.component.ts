
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudModel } from '../dashboard/crud.model';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  standalone: false
})
export class DeleteComponent implements OnInit {
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: any;
   stats: String = 'Supprimer'; 


  info: any = {};
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  constructor(private formBuilder: FormBuilder, private api: ConsultService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() :void {
    //console.log(this.config);
    this.formValue = this.formBuilder.group({

       

    })
    this.getAllEmployee();

    this.info.actif = false;
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
  }
  onNoClick(): void {
    this.ref.close();
  }
  // postDeletes(info){
  //   this.ref.close();
  //   this.api.deleteEmploye(info,info.id)
  //   .subscribe(res=>{
  //     alert("Seuil d'usure supprimé avec succès!")

  //     let ref = document.getElementById('cancel');
  //     this.ref.close();

  //     this.getAllEmployee();
  //   },
  //   err=>{
  //     alert("Veuillez réessayer plus tard");
  //   } )
   
  // }

  postDeletes(info){
    this.api.deleteFonction(info.fonctionId)
    .subscribe(res=>{
      alert("Fonction supprimé avec succès!")
      window.location.reload();
    },
    err=>{
      alert("Veuillez réessayer plus tard");
    } )
   
  }






  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
        console.log(JSON.stringify(res));
      })
  }
  

}

