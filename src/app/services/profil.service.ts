import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Profil, ProfilRequest, ProfilSimpleResponse } from '../models/profil.model';
import { ApiResponse } from '../models/api-response.model';
import { API_CONFIG } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private readonly endpoint = API_CONFIG.ENDPOINTS.PROFILS;

  constructor(private apiService: ApiService) { }

  getAll(): Observable<ApiResponse<ProfilSimpleResponse[]>> {
    return this.apiService.get<ApiResponse<ProfilSimpleResponse[]>>(this.endpoint);
  }

  getById(id: number): Observable<ApiResponse<Profil>> {
    return this.apiService.get<ApiResponse<Profil>>(`${this.endpoint}/${id}`);
  }

  getByIdWithApplications(id: number): Observable<ApiResponse<Profil>> {
    return this.apiService.get<ApiResponse<Profil>>(`${this.endpoint}/${id}/avec-applications`);
  }

  create(profil: ProfilRequest): Observable<ApiResponse<Profil>> {
    return this.apiService.post<ApiResponse<Profil>>(this.endpoint, profil);
  }

  update(id: number, profil: ProfilRequest): Observable<ApiResponse<Profil>> {
    return this.apiService.put<ApiResponse<Profil>>(`${this.endpoint}/${id}`, profil);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }

  associateApplications(profilId: number, applicationIds: number[]): Observable<ApiResponse<Profil>> {
    return this.apiService.post<ApiResponse<Profil>>(`${this.endpoint}/${profilId}/applications`, applicationIds);
  }

  dissociateApplication(profilId: number, applicationId: number): Observable<ApiResponse<Profil>> {
    return this.apiService.delete<ApiResponse<Profil>>(`${this.endpoint}/${profilId}/applications/${applicationId}`);
  }

  toggleStatus(id: number, actif: boolean): Observable<ApiResponse<void>> {
    return this.apiService.patch<ApiResponse<void>>(`${this.endpoint}/${id}/activation?actif=${actif}`);
  }
}
