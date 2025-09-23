import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AjouterComponent } from './components/ajouter/ajouter.component';
import { ParamformComponent } from './components/paramform/paramform.component';
import { DialogService, DynamicDialogModule, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPermissionsModule, NgxPermissionsService, NgxPermissionsStore } from 'ngx-permissions';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { EditformComponent } from './components/editform/editform.component';
import { DeleteComponent } from './components/delete/delete.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FilterService } from 'primeng/api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConsultService } from './shared/servicess/services/consult.service';
import { MenuComponent } from './menu/menu.component';
import { BodyComponent } from './body/body.component';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DashboardsimulationComponent } from './components/dashboardsimulation/dashboardsimulation.component';
import { DashboardtegComponent } from './components/dashboardteg/dashboardteg.component';
import { ParamformhistoricComponent } from './paramformhistoric/paramformhistoric.component';
import { ParamformtegComponent } from './paramformteg/paramformteg.component';
import { AppinitService } from './shared/servicess/services/appinit.service';
import { AjouterapplicationComponent } from './components/ajouterapplication/ajouterapplication.component';
import { AjouterspeciapplicationComponent } from './components/ajouterspeciapplication/ajouterspeciapplication.component';
import { AjouterspecificComponent } from './components/ajouterspecific/ajouterspecific.component';
import { DeleteapplicationComponent } from './components/deleteapplication/deleteapplication.component';
import { EditformapplicationComponent } from './components/editformapplication/editformapplication.component';
import { IndexComponent } from './components/index/index.component';
import { ParamapplicationComponent } from './components/paramapplication/paramapplication.component';
import { PresimulateComponent } from './components/presimulate/presimulate.component';
import { ModulesComponent } from './components/modules/modules.component';
import { DeletemodulesComponent } from './components/deletemodules/deletemodules.component';
import { EditmodulesComponent } from './components/editmodules/editmodules.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakInitService } from './services/keycloak-init.service';
import { EnvironmentService } from './services/environment.service';
import { DebugKeycloakComponent } from './components/debug-keycloak/debug-keycloak.component';
import { KeycloakDebugService } from './services/keycloak-debug.service';


@NgModule({
  declarations: [
    AppComponent,ModulesComponent,EditmodulesComponent, DeletemodulesComponent,ParamapplicationComponent,DashboardComponent,IndexComponent, AjouterComponent, ParamformComponent, EditformComponent, DeleteComponent,MenuComponent,BodyComponent, DashboardsimulationComponent, DashboardtegComponent, ParamformhistoricComponent, ParamformtegComponent,ParamformtegComponent,AjouterComponent,
    AjouterapplicationComponent,AjouterspecificComponent,AjouterspeciapplicationComponent,ParamformhistoricComponent,DeleteapplicationComponent,EditformapplicationComponent,PresimulateComponent,DebugKeycloakComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, RouterModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    TableModule,
    InputTextModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    MatAutocompleteModule,
    NgxPermissionsModule.forRoot(),
    KeycloakAngularModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDividerModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule
  ],
  exports: [
    DashboardComponent,IndexComponent,ModulesComponent,EditmodulesComponent,DeletemodulesComponent,
    AjouterComponent,AjouterapplicationComponent,AjouterspecificComponent,EditformapplicationComponent, ParamformtegComponent,ParamformComponent,ParamapplicationComponent,MatDialogModule],
  providers: [
    AppinitService,
    ConsultService,
    DialogService, FilterService,
    DynamicDialogConfig,DatePipe,
    DynamicDialogRef,
    KeycloakService,
    EnvironmentService,
    KeycloakDebugService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppinitService) => () => appInitService.init(),
      deps: [AppinitService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloakInitService: KeycloakInitService) => () => {
        // Pour le debug, on bypass l'initialisation automatique
        if (window.location.hash.includes('debug-keycloak')) {
          console.log('🔧 Mode debug: bypass de l\'initialisation Keycloak');
          return Promise.resolve();
        }
        return keycloakInitService.init();
      },
      deps: [KeycloakInitService],
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: ''}, {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}, //format datepicker dd/MM/yyyy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

