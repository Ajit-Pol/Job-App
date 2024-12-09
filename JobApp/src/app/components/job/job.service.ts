import { Injectable } from '@angular/core';
import { NewJob } from './job.model';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../shared/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  apiUrl:string = null;

  constructor(private appService:AppService, private http: HttpClient) {
    this.apiUrl = this.appService.environment.APIUrl;
  }

  getAllJobs(data_type:string = 'all') {
    return this.http.get(this.apiUrl+'job?data_type='+data_type, { responseType: 'json' });
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

  sendEmail(payload){
    return this.http.post(this.apiUrl+'job/email',payload, { responseType:'json' })
  }
}
