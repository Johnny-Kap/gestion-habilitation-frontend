import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './body/body.component';
import { DashboardtegComponent } from './components/dashboardteg/dashboardteg.component';
import { DashboardsimulationComponent } from './components/dashboardsimulation/dashboardsimulation.component';
import { IndexComponent } from './components/index/index.component';
import { ModulesComponent } from './components/modules/modules.component';
import { AuthGuard } from './guards/auth.guard';
import { DebugKeycloakComponent } from './components/debug-keycloak/debug-keycloak.component';

const routes: Routes = [
  {
    path: 'debug-keycloak',
    component: DebugKeycloakComponent
  },
  {
    path: '',
    component: BodyComponent,
    canActivate: [AuthGuard], // Temporairement désactivé pour le dev
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'index', component: IndexComponent },
      { path: 'dashboardteg', component: DashboardtegComponent },
      { path: 'dashboardsimulation', component: DashboardsimulationComponent },
      { path: 'modules', component: ModulesComponent },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
