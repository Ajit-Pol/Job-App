import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/main/main.service';
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
  profileSrc:string = 'assets/images/no-profile.svg'; 
  constructor(private router:Router, private authService:AuthService, 
    private mainService:MainService
  ){
    this.subscription = this.authService.getUser().subscribe(res => {
      if (res) {
        this.userInfo = res;
        this.userInfo?.profileId ? this.getFile(this.userInfo?.profileId) : this.profileSrc = 'assets/images/no-profile.svg'
      }
    })
  }

  ngOnInit(){
    // this.userInfo  = this.authService.getUser();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getFile(profileId) {
    this.mainService.getFile(profileId).subscribe((res: any) => {
      if (res && res?.src) {
        this.profileSrc = res.src
      }
    })
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
    this.authService.logOut();
  }
}
