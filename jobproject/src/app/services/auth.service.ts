// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { AppService } from './app.service';

// interface AuthInfo {
//   success: boolean;
//   accessToken: string;
//   expiresIn: number;
//   user: { name: string, role: string };
// }

interface UserInfo {
  name: string, 
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private isUserLoggedIn: boolean = false;
  // private userInfo: UserInfo = null;
  private apiUrl: string = null;
  private userRole: BehaviorSubject<string> = new BehaviorSubject<string>('reader');
  private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  stateUrl:string = null;
  constructor(private router: Router,
    private appService: AppService,
    private http: HttpClient
  ) {
    this.apiUrl = this.appService.environment.APIUrl;
    this.eventListener();
  }

  onLoad(){    
    // const userInfo = this.getUser();
    // if(this.validateUser(userInfo))
    //   this.userInfo = userInfo;
    // else
    //   this.logOut();

    return this.http.get(this.apiUrl + 'auth/token', { responseType: 'json' });
  }

  refreshAcessToken() {
    return this.http.get(this.apiUrl + 'auth/refresh', { responseType: 'json' })
  }

  loginStatus(navigate: boolean = false) {
    this.userRole.next('reader');
    this.isUserLoggedIn = true;
    if (navigate){
      if (this.stateUrl)
        this.router.navigateByUrl(this.stateUrl);
      else
        this.router.navigateByUrl('main');
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
    // if(!this.validateUser(this.userInfo)){
    //   this.isUserLoggedIn = false;
    // }
    return this.isUserLoggedIn;
  }

  setUser(data: UserInfo) {
    // localStorage.setItem('user', JSON.stringify(data));
    this.userInfo.next(data);
    this.isUserLoggedIn = true;
  }

  getUser(){
    // if (this.userInfo) {
    //   return this.userInfo;
    // } 
    // else {
    //   let user: AuthInfo = JSON.parse(localStorage.getItem('user'));
    //   if (user && user.accessToken) {
    //     this.userInfo = user;
    //     this.isUserLoggedIn = true;
    //     return user;
    //   }
    // }
    return this.userInfo.asObservable();;
  }

  // getAccessToken(): string {
  //   Date.now()
  //   if (this.validateUser(this.userInfo))
  //     return this.userInfo.accessToken;
  //   return null;
  // }

  // validateUser(userInfo: AuthInfo): boolean {
  //   if (!(userInfo && userInfo.accessToken))
  //     return false

  //   if (Date.now() > userInfo.expiresIn)
  //     return false;

  //   return true
  // }

  getUserRole() {
    return this.userRole.asObservable();
  }

  setUserRole(role: string) {
    this.userRole.next(role);
  }

  clear(navigate:boolean = false){
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
