import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../shared/services/toaster.service';
import { ToasterMessages, ToasterType } from '../shared/shared.model';
import { AppService } from '../services/app.service';

@Injectable()
export class CommonhttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toasterService: ToasterService, private appService: AppService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token = this.authService.getAccessToken();
    // if(token && this.authService.checkIfUserLoggedIn()){
    //   let header = {
    //     Authorization: 'Bearer ' + token
    //   }

    //   request = request.clone({
    //     setHeaders:header
    //   })
    // }
    if (!this.appService.environment.production) {
      let header = {
        withCredentials: true
      }

      request = request.clone(header)
    }

    if (request.url.includes('/refresh')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(catchError((error: any) => {
      if (error.status == 401)
        return this.handle401Error(request, next, error);
      else
        return throwError(() => { });
    }))
  }

  private handleError(error) {
    console.log(error);
    this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler, ogError: HttpErrorResponse) {
    return this.authService.refreshAcessToken()
      .pipe(
        switchMap(() => {
          const navigate = request.url.includes('/token') ? true : false;
          if (!request.url.includes('/token')) {
            return next.handle(request);
          } else {
            this.authService.loginStatus(navigate);
            return of(null)
          }
        }),
        catchError((error: any) => {
          this.authService.logOut(true);
          if (error.status != 401)
            this.handleError(error);
          return throwError(() => { ogError });
        })
      )
  }
}
