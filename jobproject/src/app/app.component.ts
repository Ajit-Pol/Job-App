import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeaderAndFooter: boolean = true;
  isUserAuthorized: boolean = true;
  unauthorizedMsg:string = "You don't have access."
  unauthorizedSecMsg:string = "You don't have access to view this URL."
  subscription:Subscription;
  userRole:string = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private appService: AppService, private authService: AuthService
  ) { 
    this.subscription = this.authService.getUserRole().subscribe(res => {
      if (res)
        this.userRole = res
        if(this.userRole == 'reader' && this.router.url.includes('add-job')){
          this.router.navigateByUrl('/main');
        }

    })
  }

  ngOnInit() {    
    this.bindRouteEvent();
  }

  ngOnDestory(){
    this.subscription.unsubscribe();
  }

  private bindRouteEvent() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(_event => {
      const route = this.appService.getActivatedRoute(this.activatedRoute);
      route?.data.subscribe(data => {
        this.showHeaderAndFooter = data.hideHeaderFooter ? false : true;
        if (data?.role?.length > 0) {
          if (data?.role?.includes(this.userRole)) {
            this.isUserAuthorized = true;
          } else {
            this.showHeaderAndFooter = false;
            this.isUserAuthorized = false;
          }
        }
      })
    })
  }
}
