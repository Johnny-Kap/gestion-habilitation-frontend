import { Routes } from '@angular/router';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { ProfilsComponent } from './pages/profils/profils.component';

// Components
import { ApplicationFormComponent } from './components/applications/application-form/application-form.component';
import { ApplicationDetailComponent } from './components/applications/application-detail/application-detail.component';
import { ProfilFormComponent } from './components/profils/profil-form/profil-form.component';
import { ProfilDetailComponent } from './components/profils/profil-detail/profil-detail.component';
import { ProfilApplicationsComponent } from './components/profils/profil-applications/profil-applications.component';

export const routes: Routes = [  // ← Ajoutez 'export' ici
  // Route par défaut
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Dashboard
  { path: 'dashboard', component: DashboardComponent },
  
  // Applications
  { path: 'applications', component: ApplicationsComponent },
  { path: 'applications/new', component: ApplicationFormComponent },
  { path: 'applications/edit/:id', component: ApplicationFormComponent },
  { path: 'applications/detail/:id', component: ApplicationDetailComponent },
  
  // Profils
  { path: 'profils', component: ProfilsComponent },
  { path: 'profils/new', component: ProfilFormComponent },
  { path: 'profils/edit/:id', component: ProfilFormComponent },
  { path: 'profils/detail/:id', component: ProfilDetailComponent },
  { path: 'profils/:id/applications', component: ProfilApplicationsComponent },
  
  // Route 404
  { path: '**', redirectTo: '/dashboard' }
];