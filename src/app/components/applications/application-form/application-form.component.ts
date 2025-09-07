import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Application, ApplicationRequest } from '../../../models/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent implements OnInit {

  applicationForm: FormGroup;
  isEditMode = false;
  applicationId: number | null = null;
  loading = false;
  error = '';
  success = '';

  // Options pour les select
  statutOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'MAINTENANCE', label: 'En maintenance' },
    { value: 'DEVELOPMENT', label: 'En développement' },
    { value: 'OBSOLETE', label: 'Obsolète' }
  ];

  iconeOptions = [
    { value: 'fas fa-desktop', label: 'Bureau' },
    { value: 'fas fa-mobile-alt', label: 'Mobile' },
    { value: 'fas fa-globe', label: 'Web' },
    { value: 'fas fa-database', label: 'Base de données' },
    { value: 'fas fa-cogs', label: 'Configuration' },
    { value: 'fas fa-users', label: 'Utilisateurs' },
    { value: 'fas fa-calculator', label: 'Calculatrice' },
    { value: 'fas fa-chart-line', label: 'Graphiques' },
    { value: 'fas fa-envelope', label: 'Email' },
    { value: 'fas fa-calendar', label: 'Calendrier' }
  ];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.applicationForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.applicationId = +params['id'];
        this.loadApplication();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      version: [''],
      url: ['', Validators.pattern(/^https?:\/\/.+/)],
      icone: [''],
      statut: ['ACTIVE'],
      actif: [true]
    });
  }

  loadApplication(): void {
    if (this.applicationId) {
      this.loading = true;
      this.applicationService.getById(this.applicationId).subscribe({
        next: (response) => {
          if (response.success) {
            this.applicationForm.patchValue(response.data);
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement de l\'application';
          this.loading = false;
          console.error('Error loading application:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const applicationData: ApplicationRequest = this.applicationForm.value;

      const request = this.isEditMode && this.applicationId
        ? this.applicationService.update(this.applicationId, applicationData)
        : this.applicationService.create(applicationData);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            this.success = this.isEditMode
              ? 'Application mise à jour avec succès'
              : 'Application créée avec succès';
            setTimeout(() => this.router.navigate(['/applications']), 2000);
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de l\'enregistrement';
          this.loading = false;
          console.error('Error saving application:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.applicationForm.controls).forEach(key => {
      this.applicationForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.applicationForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['minlength']) return `${fieldName} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
      if (field.errors['pattern']) return `Format de ${fieldName} invalide`;
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/applications']);
  }

}
