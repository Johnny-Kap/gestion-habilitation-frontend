import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-list',
  imports: [CommonModule],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.scss'
})
export class ApplicationListComponent implements OnInit {

  applications: Application[] = [];
  loading = false;
  error = '';

  // Modal variables
  showDeleteModal = false;
  applicationToDelete: Application | null = null;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.error = '';

    this.applicationService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.applications = response.data;
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

  viewApplication(id: number): void {
    this.router.navigate(['/applications/detail', id]);
  }

  editApplication(id: number): void {
    this.router.navigate(['/applications/edit', id]);
  }

  confirmDelete(application: Application): void {
    this.applicationToDelete = application;
    this.showDeleteModal = true;
  }

  deleteApplication(): void {
    if (this.applicationToDelete?.id) {
      this.applicationService.delete(this.applicationToDelete.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadApplications(); // Recharger la liste
            this.closeDeleteModal();
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression';
          console.error('Error deleting application:', error);
        }
      });
    }
  }

  toggleStatus(application: Application): void {
    if (application.id) {
      const newStatus = !application.actif;
      this.applicationService.toggleStatus(application.id, newStatus).subscribe({
        next: (response) => {
          if (response.success) {
            application.actif = newStatus;
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors du changement de statut';
          console.error('Error toggling status:', error);
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.applicationToDelete = null;
  }

  addNew(): void {
    this.router.navigate(['/applications/new']);
  }

}
