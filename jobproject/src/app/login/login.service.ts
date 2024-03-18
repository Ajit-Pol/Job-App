import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Register } from './login.model';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  apiUrl:string = null;

  constructor(private appService:AppService, private http:HttpClient) {
    this.apiUrl = this.appService.environment.APIUrl;
   }

  login(payload: Login){
    return this.http.post(this.apiUrl+'auth/login', payload, {responseType:'json'})
  }

  register(payload: Register){
    return this.http.post(this.apiUrl+'auth/register', payload, {responseType:'json'})
  }

  sendOTP(payload){
    return this.http.post(this.apiUrl+'auth/email', payload, {responseType:'json'})
  }

  ValidateOTP(payload){
    return this.http.post(this.apiUrl+'auth/validateOTP', payload, {responseType:'json'})
  }

  resetPassword(payload){
    return this.http.post(this.apiUrl+'auth/resetPassword', payload, {responseType:'json'})
  }
}
