import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3"> <span class="text-danger">Opps!</span> {{message}} </p>
        <p class="lead">
           {{secondaryMessage}}
        </p>
        <a class="btn btn-primary" (click)="navigateToHome()">Go Home</a>
    </div>
  </div>`,
  styles: []
})
export class NotFoundComponent { 
  @Input('message') message:string = 'Page not found.' 
  @Input('secondaryMessage') secondaryMessage:string  = "The page you’re looking for doesn’t exist."

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigateByUrl('main');
  }

}
