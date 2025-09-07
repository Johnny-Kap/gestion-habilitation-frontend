import { Component } from '@angular/core';
import { ProfilListComponent } from "../../components/profils/profil-list/profil-list.component";

@Component({
  selector: 'app-profils',
  imports: [ProfilListComponent],
  templateUrl: './profils.component.html',
  styleUrl: './profils.component.scss'
})
export class ProfilsComponent {

}
