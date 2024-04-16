import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewJob } from './main.model';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiUrl:string = null;

  constructor(private appService:AppService, private http: HttpClient) {
    this.apiUrl = this.appService.environment.APIUrl;
  }

  getAllJobs() {
    return this.http.get(this.apiUrl+'job', { responseType: 'json' });
  }

  getJob(jobId:string) {
    return this.http.get(this.apiUrl+'job/'+jobId, { responseType: 'json' });
  }

  saveNewJob(saveObj:NewJob){
    return this.http.post(this.apiUrl+'job',saveObj, { responseType: 'json' });
  }

  editJob(jobId:string,editObj:NewJob){
    return this.http.patch(this.apiUrl+'job/'+jobId, editObj, { responseType: 'json' });
  }

  deleteJob(jobId:string){
    return this.http.delete(this.apiUrl+'job/'+jobId, { responseType: 'json' });
  }

  getProfile(){
    return this.http.get(this.apiUrl+'auth/profile',{ responseType: 'json' });
  }

  saveProfile(saveBody){
    return this.http.patch(this.apiUrl+'auth/profile', saveBody, { responseType: 'json' })
  }

  sendEmail(payload){
    return this.http.post(this.apiUrl+'job/email',payload, { responseType:'json' })
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
