import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './shared/services/auth.service';
import { AppService } from './shared/services/app.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToasterComponent } from './shared/components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, HeaderComponent, FooterComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showHeaderAndFooter: boolean = true;
  isUserAuthorized: boolean = true;
  unauthorizedMsg:string = "You don't have access."
  unauthorizedSecMsg:string = "You don't have access to view this URL."
  subscription:Subscription;
  userRole:string = null;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService, private appService: AppService
  ) {
    // this.spinner.show(); //on app load spinner.
    
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private bindRouteEvent() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(_event => {
      const route = this.appService.getActivatedRoute(this.activatedRoute);
      route?.data.subscribe(data => {
        this.showHeaderAndFooter = data['hideHeaderFooter'] ? false : true;
        this.isUserAuthorized = true;
        // if (data['role']?.length > 0) {
        //   if (data['role']?.includes(this.userRole)) {
        //     this.isUserAuthorized = true;
        //   } else {
        //     this.showHeaderAndFooter = false;
        //     this.isUserAuthorized = false;
        //   }
        // }
      })
    })
  }
}
