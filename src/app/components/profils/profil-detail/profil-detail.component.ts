import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfilService } from '../../../services/profil.service';
import { Profil } from '../../../models/profil.model';
import {CommonModule, DatePipe} from '@angular/common'

@Component({
  selector: 'app-profil-detail',
  imports: [DatePipe, RouterModule, CommonModule],
  templateUrl: './profil-detail.component.html',
  styleUrl: './profil-detail.component.scss'
})
export class ProfilDetailComponent implements OnInit {

  profil: Profil | null = null;
  loading = false;
  error = '';
  profilId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profilService: ProfilService
  ) {
    this.profilId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadProfil();
  }

  loadProfil(): void {
    this.loading = true;
    this.error = '';

    this.profilService.getByIdWithApplications(this.profilId).subscribe({
      next: (response) => {
        if (response.success) {
          this.profil = response.data;
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

  editProfil(): void {
    this.router.navigate(['/profils/edit', this.profilId]);
  }

  manageApplications(): void {
    this.router.navigate(['/profils', this.profilId, 'applications']);
  }

  goBack(): void {
    this.router.navigate(['/profils']);
  }

  openApplication(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

}
