import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-paramformhistoric',
  templateUrl: './paramformhistoric.component.html',
  styleUrls: ['./paramformhistoric.component.css'],
  standalone: false
})
export class ParamformhistoricComponent implements OnInit {

  info: any = {};
  readOnlyStyleGuideNotes : boolean;
  isChecked:boolean ;

  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    //console.log(this.config);
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
    this.readOnlyStyleGuideNotes=true;
    this.isChecked =this.info.actif;


  }

  updateAllComplete(){
    
  }

  onNoClick(): void {
    this.ref.close();
  }


}
