import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfilService } from '../../../services/profil.service';
import { ApplicationService } from '../../../services/application.service';
import { Profil } from '../../../models/profil.model';
import { Application } from '../../../models/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-applications',
  imports: [RouterModule, CommonModule],
  templateUrl: './profil-applications.component.html',
  styleUrl: './profil-applications.component.scss'
})
export class ProfilApplicationsComponent implements OnInit {

  profil: Profil | null = null;
  allApplications: Application[] = [];
  availableApplications: Application[] = [];
  loading = false;
  error = '';
  success = '';
  profilId: number;

  // Variables pour la modal d'ajout
  showAddModal = false;
  selectedApplicationsToAdd: number[] = [];

  // Variables pour la modal de suppression
  showRemoveModal = false;
  applicationToRemove: Application | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profilService: ProfilService,
    private applicationService: ApplicationService
  ) {
    this.profilId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    // Charger le profil avec ses applications
    this.profilService.getByIdWithApplications(this.profilId).subscribe({
      next: (response) => {
        if (response.success) {
          this.profil = response.data;
          this.loadAllApplications();
        } else {
          this.error = response.message;
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement du profil';
        this.loading = false;
        console.error('Error loading profil:', error);
      }
    });
  }

  loadAllApplications(): void {
    this.applicationService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.allApplications = response.data.filter(app => app.actif);
          this.updateAvailableApplications();
        } else {
          this.error = response.message;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des applications';
        this.loading = false;
        console.error('Error loading applications:', error);
      }
    });
  }

  updateAvailableApplications(): void {
    const associatedIds = this.profil?.applications?.map(app => app.id) || [];
    this.availableApplications = this.allApplications.filter(
      app => !associatedIds.includes(app.id)
    );
  }

  // Gestion de la modal d'ajout
  openAddModal(): void {
    this.selectedApplicationsToAdd = [];
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.selectedApplicationsToAdd = [];
  }

  onApplicationSelectChange(applicationId: number, event: any): void {
    if (event.target.checked) {
      this.selectedApplicationsToAdd.push(applicationId);
    } else {
      const index = this.selectedApplicationsToAdd.indexOf(applicationId);
      if (index > -1) {
        this.selectedApplicationsToAdd.splice(index, 1);
      }
    }
  }

  addSelectedApplications(): void {
    if (this.selectedApplicationsToAdd.length > 0) {
      this.profilService.associateApplications(this.profilId, this.selectedApplicationsToAdd).subscribe({
        next: (response) => {
          if (response.success) {
            this.success = `${this.selectedApplicationsToAdd.length} application(s) associée(s) avec succès`;
            this.closeAddModal();
            this.loadData();
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de l\'association';
          console.error('Error associating applications:', error);
        }
      });
    }
  }

  // Gestion de la modal de suppression
  confirmRemoveApplication(application: Application): void {
    this.applicationToRemove = application;
    this.showRemoveModal = true;
  }

  closeRemoveModal(): void {
    this.showRemoveModal = false;
    this.applicationToRemove = null;
  }

  removeApplication(): void {
    if (this.applicationToRemove?.id) {
      this.profilService.dissociateApplication(this.profilId, this.applicationToRemove.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.success = 'Application dissociée avec succès';
            this.closeRemoveModal();
            this.loadData();
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la dissociation';
          console.error('Error dissociating application:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/profils']);
  }

  goToProfilDetail(): void {
    this.router.navigate(['/profils/detail', this.profilId]);
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }

}
