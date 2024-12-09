import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { ToasterService } from '../shared/services/toaster.service';
import { ToasterMessages, ToasterType } from '../shared/shared.model';

export const commonHttpInterceptor: HttpInterceptorFn = (req, next) : any => {
  const appService = inject(AppService);
  const authService = inject(AuthService);
  if (!appService.environment.production) {
    let header = {
      withCredentials: true
    }

    req = req.clone(header);
  }

  if (req.url.includes('/refresh')) {
    return next(req);
  }

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status == 401) {
      return handle401Error(req, next, error, authService);
    } else {
      return throwError(() => error);
    }
  }))
};


 const handle401Error = (req, next, ogError,authService) => {

  return authService.refreshAccessToken().pipe(
    switchMap(() => {
      const navigate = req.url.includes('/token') ? true : false;
      if (!navigate) {
        return next(req);
      } else {
        authService.loginStatus(navigate);
        return of(null)
      }
    }),
    catchError((error: HttpErrorResponse) => {
      authService.clear(true);
      if (error.status != 401) {
        handleError(error)
      }
      return throwError(() => ogError)
    })
  )
}

const handleError = (error) => {
  inject(ToasterService).showToaster(ToasterType.warning, ToasterMessages.errorMsg)
  console.log(error);
}