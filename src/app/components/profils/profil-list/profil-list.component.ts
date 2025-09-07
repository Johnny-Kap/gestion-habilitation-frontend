import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from '../../../services/profil.service';
import { ProfilSimpleResponse } from '../../../models/profil.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-list',
  imports: [CommonModule],
  templateUrl: './profil-list.component.html',
  styleUrl: './profil-list.component.scss'
})
export class ProfilListComponent implements OnInit {

  profils: ProfilSimpleResponse[] = [];
  loading = false;
  error = '';

  // Modal variables
  showDeleteModal = false;
  profilToDelete: ProfilSimpleResponse | null = null;

  constructor(
    private profilService: ProfilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfils();
  }

  loadProfils(): void {
    this.loading = true;
    this.error = '';

    this.profilService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.profils = response.data;
        } else {
          this.error = response.message;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des profils';
        this.loading = false;
        console.error('Error loading profils:', error);
      }
    });
  }

  viewProfil(id: number): void {
    this.router.navigate(['/profils/detail', id]);
  }

  editProfil(id: number): void {
    this.router.navigate(['/profils/edit', id]);
  }

  manageApplications(id: number): void {
    this.router.navigate(['/profils', id, 'applications']);
  }

  confirmDelete(profil: ProfilSimpleResponse): void {
    this.profilToDelete = profil;
    this.showDeleteModal = true;
  }

  deleteProfil(): void {
    if (this.profilToDelete?.id) {
      this.profilService.delete(this.profilToDelete.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadProfils(); // Recharger la liste
            this.closeDeleteModal();
          } else {
            this.error = response.message;
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression';
          console.error('Error deleting profil:', error);
        }
      });
    }
  }

  toggleStatus(profil: ProfilSimpleResponse): void {
    const newStatus = !profil.actif;
    this.profilService.toggleStatus(profil.id, newStatus).subscribe({
      next: (response) => {
        if (response.success) {
          profil.actif = newStatus;
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

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.profilToDelete = null;
  }

  addNew(): void {
    this.router.navigate(['/profils/new']);
  }

}
