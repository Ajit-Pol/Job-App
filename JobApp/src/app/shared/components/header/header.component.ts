import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ImageDirective } from '../../directives/image.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ImageDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userInfo = null;
  showDrp: boolean = false;
  isLoggedIn: boolean = true;
  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.subscription = this.authService.getUser().subscribe(res => {
      if (res) {
        this.userInfo = res;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToMain() {
    this.router.navigateByUrl('/main');
  }

  navigateToMyJobs() {
    this.router.navigateByUrl('/my-jobs');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/profile');
    this.showDrp = false;
  }

  logOut() {
    this.authService.setLocalStorage('log-out', Math.random().toString());
    this.authService.logOut();
    this.showDrp = false;
  }

  @HostListener('document:click', ['$event.target'])
  closeDropdown(event) {
    let id = 'profile-header'
    if (this.showDrp && !(event?.parentElement?.parentElement?.parentElement?.id == id || event.parentElement.parentElement.id == id)) {
      this.showDrp = false;
    }

  }
}
