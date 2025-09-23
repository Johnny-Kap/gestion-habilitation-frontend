import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from '@angular/common'
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Router } from '@angular/router';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';
// import { AfbcoreService } from 'afbcore';


@Component({
  selector: 'app-editmodules',
  templateUrl: './editmodules.component.html',
  styleUrls: ['./editmodules.component.css'],
  providers: [DialogService],
  standalone: false
})
export class EditmodulesComponent implements OnInit {
  formValue!: FormGroup;

  info: any = {};
  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private api: ConsultService, public dialog: MatDialog, private dialogService: DialogService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private router: Router/* ,private afbcore: AfbcoreService */) { }

  ngOnInit() {
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;

  }




  onNoClick(): void {
    this.ref.close();
  }

  postUpdatesapplication(info){
    this.api.updateModuleapi(info,info.moduleId)
    .subscribe(res=>{
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('SUCCESS', 'Mis à jour avec succès');
      alert('Mis à jour avec succès');

     // alert("Mis à jour avec succès")
      let ref = document.getElementById('cancel');
      this.ref.close();    
       this.formValue.reset();

    },
    err=>{
      // TODO: Remplacer par la nouvelle méthode de notification
      // this.afbcore.showMessage('DANGER', 'Erreur lors de la mise à jour!');
      alert('Erreur lors de la mise à jour!');

      //alert("Erreur lors de la mise à jour!");
    } )
}


}
