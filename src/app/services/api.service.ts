import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    // Lire la configuration depuis les variables Docker
    const config = ConfigService.getConfig();
    this.baseUrl = config.api.baseUrl;
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key].toString());
        }
      });
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params: httpParams })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  patch<T>(endpoint: string, data?: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => errorMessage);
  }
}