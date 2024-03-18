// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  environment = null;

  constructor() { 
    this.environment = environment;
    console.log('Environment status',this.environment.production);   
  }

  getActivatedRoute(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getActivatedRoute(activatedRoute.firstChild);
    } else {
      return activatedRoute
    }
  }

  // setLocalStorage(key: string, value: string) {
  //   localStorage.setItem(key, value);
  // }

  // getLocalStorage(key: string) {
  //  return localStorage.getItem(key);
  // }
}
