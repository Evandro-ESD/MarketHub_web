// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../../shared/services/alert.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

let isRedirecting = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router); // eslint-disable-line @typescript-eslint/no-unused-vars
  const alerts = inject(AlertService);
  const token = auth.getToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if ((err.status === 401 || err.status === 403) && !isRedirecting) {
          isRedirecting = true;
          alerts.info('Sessão expirada. Faça login novamente.');
          auth.logout(); // já navega para /login
          setTimeout(()=> isRedirecting = false, 1500);
        }
      }
      return throwError(() => err);
    })
  );
};
