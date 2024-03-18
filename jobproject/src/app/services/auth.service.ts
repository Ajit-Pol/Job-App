import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface AuthInfo  {
  success:boolean;
  accessToken:string;
  expiresIn:number;
  user:{name:string, role:string};
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private isUserLoggedIn: boolean = false;
  private userInfo:AuthInfo = null; 
  constructor( private router:Router
    // private http: HttpClient
  ) {
    this.onLoad();
    this.eventListener();
   }

   onLoad(){
    const userInfo = this.getUser();
    if(this.validateUser(userInfo))
      this.userInfo = userInfo;
    else
      this.logOut();
   }

   eventListener(){
    window.addEventListener('storage', this.storageEventListener.bind(this))
   }

  storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      if (event?.key && event.key == 'log-out') {
        this.logOut(true);
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage',this.storageEventListener.bind(this));
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  checkIfUserLoggedIn() {
    if(!this.validateUser(this.userInfo)){
      this.isUserLoggedIn = false;
    }
    return this.isUserLoggedIn;
  }

  setUser(data:AuthInfo){
    localStorage.setItem('user', JSON.stringify(data));
    this.userInfo = data;
    this.isUserLoggedIn = true;
  }

  getUser(): AuthInfo {
    if (this.userInfo) {
      return this.userInfo;
    } else {
      let user: AuthInfo = JSON.parse(localStorage.getItem('user'));
      if (user && user.accessToken) {
        this.userInfo = user;
        this.isUserLoggedIn = true;
        return user;
      }
      return null;
    }
  }

  getAccessToken(): string {Date.now()
    if (this.validateUser(this.userInfo))
      return this.userInfo.accessToken;
    return null;
  }

  validateUser(userInfo:AuthInfo):boolean {
    if(!(userInfo && userInfo.accessToken))
      return false

    if(Date.now() > userInfo.expiresIn)
      return false;

    return true
  }

  getUserRole():string{
    if(this.userInfo)
      return this.userInfo.user.role;
    return null;
  }

  logOut(navigate:boolean = false){
    this.userInfo = null;
    localStorage.clear();
    this.isUserLoggedIn = false;
    if(navigate)
      this.router.navigateByUrl('login');
  }

}
