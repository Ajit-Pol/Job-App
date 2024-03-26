import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  leftPanelTabs = [{ name: 'All Jobs', active: false, show: true, url: 'main/all-jobs' },
  { name: 'Add Job', active: false, show: true, url: 'main/add-job' },
  { name: 'Profile', active: false, show: true, url: 'main/profile' },
  { name: '', active: false, show: false, url: 'main/edit-job' },
  { name: '', active: false, show: false, url: 'main/detail-job' }];

  userRole: string = null;
  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.subscription = this.authService.getUserRole().subscribe(res => {
      if (res)
        this.userRole = res
      this.leftPanelTabs[1].show = this.userRole == 'creator' ? true : false;
      if (!this.leftPanelTabs[1].show)
        this.leftPanelTabs[1].active = false;
      this.changeTab(0, this.router.url);
    })
  }

  ngOnInit() {
    this.changeTab(0, this.router.url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeTab(tabIndex: number, curUrl: string = null) {
    if (curUrl) {
      let tab = this.leftPanelTabs.filter(tab => { return curUrl.includes(tab.url) })[0];
      if (tab && tab.show)
        tab.active = true
      else
        this.leftPanelTabs[0].active = true;
    } else
      if (!this.leftPanelTabs[tabIndex].active) {
        this.leftPanelTabs.forEach(tab => {
          tab.active = false;
        })
        this.leftPanelTabs[tabIndex].active = true;
        this.router.navigateByUrl(this.leftPanelTabs[tabIndex].url);
      }
  }
}
