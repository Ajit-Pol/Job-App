import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { JobDetails } from '../main.model';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterMessages, ToasterType } from 'src/app/shared/shared.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-alljobs',
  templateUrl: './alljobs.component.html',
  styleUrls: ['./alljobs.component.css']
})
export class AlljobsComponent {
  jobsList: JobDetails[] = [];
  jobsListCopy: JobDetails[] = [];
  userRole:string = null;
  searchKey:string = null;

  constructor(private mainService: MainService, private router: Router,
    private toasterService: ToasterService, private authService:AuthService, 
    private spinner: NgxSpinnerService) {
        this.userRole = this.authService.getUserRole();
     }

  ngOnInit() {
    this.getAllJobs()
  }

  getAllJobs() {
    this.spinner.show();
    this.mainService.getAllJobs().subscribe((res: { jobs: JobDetails[] }) => {
      if (res?.jobs)
        this.jobsList = res.jobs;
      this.jobsListCopy = res.jobs;
      this.spinner.hide();
    },()=>{
      this.spinner.hide();
    })
  }

  editJob(jobId: string) {
    jobId && this.router.navigateByUrl(`main/edit-job/${jobId}`);
  }

  deleteJob(jobId: string) {
    this.spinner.show();
    this.mainService.deleteJob(jobId).subscribe(res => {
      if (res){
        this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
        this.getAllJobs();
      }
      else{
        this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
        this.spinner.hide();
      }
    },()=>{
      this.spinner.hide();
    })
  }

  navigateTOJobDetails(jobId: string) {
    if (this.userRole == 'reader')
      jobId && this.router.navigateByUrl(`main/detail-job/${jobId}`);
  }
}
