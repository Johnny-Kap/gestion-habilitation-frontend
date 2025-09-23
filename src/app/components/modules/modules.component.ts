import { Component, OnInit } from '@angular/core';
import { Modulemodel } from '../../model/Module.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Router } from '@angular/router';
import { EditmodulesComponent } from '../editmodules/editmodules.component';
import { DeletemodulesComponent } from '../deletemodules/deletemodules.component';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
  providers: [DialogService],
  standalone: false
})
export class ModulesComponent implements OnInit {

  moduleData: Modulemodel[] = [];
  public moduleslist: any[] = [];
  info: any = {};
  formValue!: FormGroup;
  mySelectmeme: string;
  loading: boolean = false;
  selectedItem: any = null;


  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private api: ConsultService, public dialog: MatDialog, private dialogService: DialogService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private router: Router) { }

  ngOnInit(): void {
    this.getallmodules();
    this.getdropdown();
    this.formValue = this.formBuilder.group({})
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;


  }
  selectChangeModule(){
    console.log("code categie of segment selected is", this.mySelectmeme)



  }
  searchfonction(info) {
    info.mnom=this.mySelectmeme;
    this.api.getsingleModule(info.mnom)
      .subscribe(res => {

        this.moduleData = res;
        console.log("info.fnom JSON",JSON.stringify(this.moduleData));

      },
        err => {
          alert('error')

        })
  }


  onEditmat(obj) {
    let data = obj;
    const ref = this.dialogService.open(EditmodulesComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'EDITER MODULE',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  }
 
 
 
  onDemat(obj) {
    let data = obj;
    const ref = this.dialogService.open(DeletemodulesComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'SUPPRIMER MODULE',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  }
 
  getdropdown() {
    this.api.getAllModulesapi().subscribe(res =>
      this.moduleslist = res);
  }

  getallmodules() {
    this.api.getAllModulesapi()
      .subscribe(res => {
        this.moduleData = res;
      })
  }


}
