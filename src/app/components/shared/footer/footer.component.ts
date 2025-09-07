import { DatePipe } from '@angular/common';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  currentYear: number = new Date().getFullYear();
  lastUpdate: Date = new Date();
  backendStatus: string = 'En ligne';

  constructor() { }

  ngOnInit(): void {
    // Vous pouvez ajouter ici une vérification du statut du backend
    this.checkBackendStatus();
  }

  private checkBackendStatus(): void {
    // Optionnel : vérifier le statut du backend
    // Ceci pourrait faire un appel à votre API pour vérifier la santé
    this.backendStatus = 'En ligne';
  }

}
