import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';
import { CommonModule, DatePipe } from '@angular/common'

@Component({
  selector: 'app-application-detail',
  imports: [DatePipe, CommonModule],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.scss'
})

export class ApplicationDetailComponent implements OnInit {

  application: Application | null = null;
  loading = false;
  error = '';
  applicationId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {
    this.applicationId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadApplication();
  }

  loadApplication(): void {
    this.loading = true;
    this.error = '';

    this.applicationService.getById(this.applicationId).subscribe({
      next: (response) => {
        if (response.success) {
          this.application = response.data;
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

  editApplication(): void {
    this.router.navigate(['/applications/edit', this.applicationId]);
  }

  goBack(): void {
    this.router.navigate(['/applications']);
  }

  openApplication() {
    if (this.application?.url) {
      window.open(this.application.url, '_blank');
    }
  }

}
