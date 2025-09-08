import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule], // Supprimer DatePipe s'il n'est pas utilisé
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  lastUpdate: Date = new Date();
  backendStatus: string = 'En ligne';

  constructor() { }
}