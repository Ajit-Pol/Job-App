import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { commonHttpInterceptor } from './interceptors/common-http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [AuthService],
      multi: true,
      useFactory: (authService:AuthService) => () => {
        authService.onLoad().subscribe((res:any)=>{
          if(res?.success){
            authService.loginStatus(true);
            authService.setUser(res.user);
          }
        })
      }
    },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideHttpClient(withInterceptors([commonHttpInterceptor])),
    importProvidersFrom([BrowserAnimationsModule])  
  ]
};
