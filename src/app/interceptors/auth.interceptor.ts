import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { catchError, throwError, from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  // Ajouter le token Bearer aux requêtes API
  if (req.url.includes('/api/') && keycloakService.isLoggedIn()) {
    
    // Récupérer le token de manière synchrone
    const keycloakInstance = keycloakService.getKeycloakInstance();
    const token = keycloakInstance.token;
    
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      
      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Token invalide, essayer de rafraîchir
            return from(keycloakService.updateToken(30)).pipe(
              switchMap(() => {
                // Token rafraîchi, réessayer la requête
                const newToken = keycloakService.getKeycloakInstance().token;
                const retryReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                });
                return next(retryReq);
              }),
              catchError((refreshError) => {
                // Rafraîchissement échoué, rediriger vers la connexion
                keycloakService.login();
                return throwError(() => refreshError);
              })
            );
          }
          return throwError(() => error);
        })
      );
    }
  }
  
  return next(req);
};