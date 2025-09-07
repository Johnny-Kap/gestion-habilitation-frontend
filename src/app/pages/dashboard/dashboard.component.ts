import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ProfilService } from '../../services/profil.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  stats = {
    totalApplications: 0,
    activeApplications: 0,
    totalProfils: 0,
    activeProfils: 0,
    totalAssociations: 0
  };

  lastBackup = new Date();
  loading = false;

  constructor(
    private applicationService: ApplicationService,
    private profilService: ProfilService
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;

    // Charger les statistiques des applications
    this.applicationService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats.totalApplications = response.data.length;
          this.stats.activeApplications = response.data.filter(app => app.actif).length;
        }
      }
    });

    // Charger les statistiques des profils
    this.profilService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats.totalProfils = response.data.length;
          this.stats.activeProfils = response.data.filter(profil => profil.actif).length;
          this.stats.totalAssociations = response.data.reduce((sum, profil) => sum + (profil.nombreApplications || 0), 0);
        }
        this.loading = false;
      }
    });
  }

}
