import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultService } from 'src/app/shared/servicess/services/consult.service';
import { Fonctionmodel } from '../../model/Fonction.model';

@Component({
  selector: 'app-paramform',
  templateUrl: './paramform.component.html',
  styleUrls: ['./paramform.component.css'],
  standalone: false
})
export class ParamformComponent implements OnInit {
  public usersmeme: any[] = [];
  public usersme: any;
  public users: any;

  CrudModelobj: Fonctionmodel = new Fonctionmodel();

  selectedValuememe: any;
  mySelectmeme: string;
  mySelectme: string;
  mySelect: string;

  selectedappli: string;
  employeeData!: any;

  info: any = {};
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  constructor(
    public ref: DynamicDialogRef, private api: ConsultService,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.getmeme();
    //console.log(this.config);
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
    

  }
  getmeme() {
    this.api.getAllfonction().subscribe(res =>
      this.usersmeme = res);
  }
  selectChangememe() {
    this.api.getsingleFonction(this.mySelectmeme)
    .subscribe(res => {
      this.usersme = res[0].application;
    },
      err => {
        alert('error')

      })
    
    }
    selectChangeme(){
      this.api.getsingleApplication(this.mySelectme)
      .subscribe(res => {
        this.users = res[0].modules;
      },
        err => {
          alert('error')
  
        })
    }
    seleCtChange(){

    }





  onNoClick(): void {
    this.ref.close();
  }


}
