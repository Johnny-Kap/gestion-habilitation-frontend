import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Application, ApplicationRequest } from '../models/application.model';
import { ApiResponse } from '../models/api-response.model';
import { API_CONFIG } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly endpoint = API_CONFIG.ENDPOINTS.APPLICATIONS;

  constructor(private apiService: ApiService) { }

  getAll(): Observable<ApiResponse<Application[]>> {
    return this.apiService.get<ApiResponse<Application[]>>(this.endpoint);
  }

  getById(id: number): Observable<ApiResponse<Application>> {
    return this.apiService.get<ApiResponse<Application>>(`${this.endpoint}/${id}`);
  }

  create(application: ApplicationRequest): Observable<ApiResponse<Application>> {
    return this.apiService.post<ApiResponse<Application>>(this.endpoint, application);
  }

  update(id: number, application: ApplicationRequest): Observable<ApiResponse<Application>> {
    return this.apiService.put<ApiResponse<Application>>(`${this.endpoint}/${id}`, application);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }

  toggleStatus(id: number, actif: boolean): Observable<ApiResponse<void>> {
    return this.apiService.patch<ApiResponse<void>>(`${this.endpoint}/${id}/activation?actif=${actif}`);
  }
}
