import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface UserInfo {
  name: string,
  role?: string,
  profileId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private isUserLoggedIn: boolean = false;
  private apiUrl: string = null;
  private userRole: BehaviorSubject<string> = new BehaviorSubject<string>('reader');
  private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  stateUrl: string = null;
  constructor(private router: Router,
    private appService: AppService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.apiUrl = this.appService.environment.APIUrl;
    this.eventListener();
  }

  onLoad() {
    this.spinner.show();
    return this.http.get(this.apiUrl + 'auth/token', { responseType: 'json' });
  }

  refreshAccessToken() {
    this.spinner.show();
    return this.http.get(this.apiUrl + 'auth/refresh', { responseType: 'json' })
  }

  loginStatus(navigate: boolean = false) {
    this.spinner.hide();
    this.userRole.next('reader');
    this.isUserLoggedIn = true;
    if (navigate) {
      if (this.stateUrl)
        this.router.navigate([this.stateUrl], { replaceUrl: true });
      else
        this.router.navigate(['main'], { replaceUrl: true });
    }
  }

  eventListener() {
    window.addEventListener('storage', this.storageEventListener.bind(this))
  }

  storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      if (event?.key && event.key == 'log-out') {
        this.logOut();
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  checkIfUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setUser(data: UserInfo) {
    this.userInfo.next(data);
    this.isUserLoggedIn = true;
  }

  getUser() {
    return this.userInfo.asObservable();;
  }

  getUserRole() {
    return this.userRole.asObservable();
  }

  setUserRole(role: string) {
    this.userRole.next(role);
  }

  clear(navigate: boolean = false) {
    this.spinner.hide();
    this.userInfo.next(null);
    this.userRole.next('reader');
    localStorage.clear();
    this.isUserLoggedIn = false;
    if (navigate)
      this.router.navigateByUrl('login');
  }

  logOut() {
    this.http.get(this.apiUrl + 'auth/clear', { responseType: 'json' }).subscribe(_res => {
      this.clear(true);
    })
  }
}
