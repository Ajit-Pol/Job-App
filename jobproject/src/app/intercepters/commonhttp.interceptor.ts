import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../shared/services/toaster.service';
import { ToasterMessages, ToasterType } from '../shared/shared.model';

@Injectable()
export class CommonhttpInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService, private toasterService:ToasterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();
    if(token && this.authService.checkIfUserLoggedIn()){
      let header = {
        Authorization: 'Bearer ' + token
      }
      
      request = request.clone({
        setHeaders:header
      })
    }
    return next.handle(request).pipe(tap(()=>{},(error=>{
           this.handleError(error)
    })));
  }

  handleError(error) {
    console.log(error);
    this.toasterService.showToaster(ToasterType.warning,ToasterMessages.errorMsg);
  }
}
