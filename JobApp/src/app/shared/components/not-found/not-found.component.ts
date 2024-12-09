import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  message:string = 'Page not found.' 
  secondaryMessage:string  = "The page you’re looking for doesn’t exist."
  constructor(private router:Router){}

  navigateToHome() {
    this.router.navigateByUrl('/main');
  } 
}
