import { Injectable } from '@angular/core';
import { AppService } from '../../shared/services/app.service';
import { Login, Register } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = null;

  constructor(private appService: AppService, private http: HttpClient) {
    this.apiUrl = this.appService.environment.APIUrl;
  }

  guest() {
    return this.http.post(this.apiUrl + 'auth/guest', { withCredentials: true, responseType: 'json' })
  }

  login(payload: Login) {
    return this.http.post(this.apiUrl + 'auth/login', payload, { withCredentials: true, responseType: 'json' })
  }

  register(payload: Register) {
    return this.http.post(this.apiUrl + 'auth/register', payload, { responseType: 'json' })
  }

  sendOTP(payload) {
    return this.http.post(this.apiUrl + 'auth/email', payload, { responseType: 'json' })
  }

  ValidateOTP(payload) {
    return this.http.post(this.apiUrl + 'auth/validateOTP', payload, { responseType: 'json' })
  }

  resetPassword(payload) {
    return this.http.post(this.apiUrl + 'auth/resetPassword', payload, { responseType: 'json' })
  }

  getProfile(){
    return this.http.get(this.apiUrl+'auth/profile',{ responseType: 'json' });
  }

  saveProfile(saveBody){
    return this.http.patch(this.apiUrl+'auth/profile', saveBody, { responseType: 'json' })
  }

  fileUpload(data) {   
    return this.http.post(this.apiUrl + 'upload', data)
  }

  getFile(imageUId:string){
    return this.http.get(this.apiUrl+'upload/'+ imageUId , { responseType: 'json' });
  }

  deleteFile(imageUId:string) {
    return this.http.delete(this.apiUrl+'upload/'+ imageUId , { responseType: 'json' });
  }
}
