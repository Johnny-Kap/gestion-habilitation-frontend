import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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

export const routes: Routes = [
  // Route par défaut - SANS protection pour permettre la redirection initiale
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Routes protégées par Keycloak
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'applications', 
    component: ApplicationsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'applications/new', 
    component: ApplicationFormComponent,
    canActivate: [AuthGuard],
    // data: { roles: ['admin'] } // Exemple de rôle requis
  },
  { 
    path: 'applications/edit/:id', 
    component: ApplicationFormComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'applications/detail/:id', 
    component: ApplicationDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profils', 
    component: ProfilsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profils/new', 
    component: ProfilFormComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'profils/edit/:id', 
    component: ProfilFormComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'profils/detail/:id', 
    component: ProfilDetailComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'profils/:id/applications', 
    component: ProfilApplicationsComponent,
    canActivate: [AuthGuard],
  },
  
  // Route 404
  { path: '**', redirectTo: '/dashboard' }
];