import { Component } from '@angular/core';
import { ApplicationListComponent } from "../../components/applications/application-list/application-list.component";

@Component({
  selector: 'app-applications',
  imports: [ApplicationListComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {

}
