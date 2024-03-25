import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo = null;
  currentRole:string = null;
  toggleValue:boolean = true;
  subscription:Subscription;

  constructor(private router:Router, private authService:AuthService){
    this.subscription = this.authService.getUser().subscribe(res => {
      if (res)
      this.userInfo  = res;
    })
  }

  ngOnInit(){
    // this.userInfo  = this.authService.getUser();
  }

  ngOnDestory(){
    this.subscription.unsubscribe();
  }

  navigateToMain(){
    this.router.navigateByUrl('main');
  }

  toggleRole(){
    this.toggleValue = !this.toggleValue;
    if(this.toggleValue)
      this.currentRole = 'reader'
    else
      this.currentRole = 'creator'
    this.authService.setUserRole(this.currentRole)
  }

  logOut(){
    this.authService.setLocalStorage('log-out',Math.random().toString());
    this.authService.logOut(true);
  }
}
