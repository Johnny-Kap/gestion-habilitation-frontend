import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilService } from '../../../services/profil.service';
import { ApplicationService } from '../../../services/application.service';
import { Profil, ProfilRequest } from '../../../models/profil.model';
import { Application } from '../../../models/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profil-form.component.html',
  styleUrl: './profil-form.component.scss'
})
export class ProfilFormComponent implements OnInit {

  profilForm: FormGroup;
  isEditMode = false;
  profilId: number | null = null;
  loading = false;
  error = '';
  success = '';

  // Données pour les sélections
  applications: Application[] = [];
  selectedApplications: number[] = [];

  // Options pour les types de profil
  typeProfilOptions = [
    { value: 'ADMINISTRATEUR', label: 'Administrateur' },
    { value: 'GESTIONNAIRE', label: 'Gestionnaire' },
    { value: 'UTILISATEUR', label: 'Utilisateur' },
    { value: 'CONSULTANT', label: 'Consultant' },
    { value: 'INVITE', label: 'Invité' }
  ];

  constructor(
    private fb: FormBuilder,
    private profilService: ProfilService,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.profilForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadApplications();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.profilId = +params['id'];
        this.loadProfil();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      typeProfil: ['UTILISATEUR'],
      actif: [true],
      applicationIds: [[]]
    });
  }

  loadApplications(): void {
    this.applicationService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.applications = response.data.filter(app => app.actif);
        }
      },
      error: (error) => {
        console.error('Error loading applications:', error);
      }
    });
  }

  loadProfil(): void {
    if (this.profilId) {
      this.loading = true;
      this.profilService.getByIdWithApplications(this.profilId).subscribe({
        next: (response) => {
          if (response.success) {
            const profil = response.data;
            this.selectedApplications = profil.applications?.map(app => app.id!) || [];

            this.profilForm.patchValue({
              nom: profil.nom,
              description: profil.description,
              typeProfil: profil.typeProfil,
              actif: profil.actif,
              applicationIds: this.selectedApplications
            });
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement du profil';
          this.loading = false;
          console.error('Error loading profil:', error);
        }
      });
    }
  }

  onApplicationChange(applicationId: number, event: any): void {
    if (event.target.checked) {
      this.selectedApplications.push(applicationId);
    } else {
      const index = this.selectedApplications.indexOf(applicationId);
      if (index > -1) {
        this.selectedApplications.splice(index, 1);
      }
    }
    this.profilForm.patchValue({ applicationIds: this.selectedApplications });
  }

  isApplicationSelected(applicationId: number): boolean {
    return this.selectedApplications.includes(applicationId);
  }

  onSubmit(): void {
    if (this.profilForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const profilData: ProfilRequest = {
        ...this.profilForm.value,
        applicationIds: this.selectedApplications
      };

      const request = this.isEditMode && this.profilId
        ? this.profilService.update(this.profilId, profilData)
        : this.profilService.create(profilData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.success = this.isEditMode
              ? 'Profil mis à jour avec succès'
              : 'Profil créé avec succès';
            setTimeout(() => this.router.navigate(['/profils']), 2000);
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de l\'enregistrement';
          this.loading = false;
          console.error('Error saving profil:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.profilForm.controls).forEach(key => {
      this.profilForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profilForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.profilForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['minlength']) return `${fieldName} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/profils']);
  }

}
