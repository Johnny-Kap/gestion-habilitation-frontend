import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Vos composants standalone
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <app-header></app-header>
      
      <div class="d-flex flex-grow-1">
        <app-sidebar class="d-none d-lg-block"></app-sidebar>
        
        <main class="flex-grow-1 content-wrapper">
          <router-outlet></router-outlet>
        </main>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-habilitation-frontend';
}