import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo = null;

  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(){
    this.userInfo = this.authService.getUser();
  }

  navigateToMain(){
    this.router.navigateByUrl('main');
  }

  logOut(){
    this.authService.setLocalStorage('log-out',Math.random().toString());
    this.authService.logOut(true);
  }
}
