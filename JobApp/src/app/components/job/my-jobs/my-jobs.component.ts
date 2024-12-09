import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobDetails } from '../job.model';
import { DatePipe } from '@angular/common';
import { ToasterMessages, ToasterType } from '../../../shared/shared.model';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.css'
})
export class MyJobsComponent {
  jobsList: JobDetails[] = [];


  constructor(private jobService: JobService, private router: Router,
    private spinner: NgxSpinnerService, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.getAllJobs()
  }

  getAllJobs() {
    this.spinner.show();
    this.jobService.getAllJobs('user').subscribe((res: { jobs: JobDetails[] }) => {
      if (res?.jobs) {
        this.jobsList = res?.jobs || [];
      }
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    })
  }

  deleteJob(jobId: string) {
    this.spinner.show();
    this.jobService.deleteJob(jobId).subscribe(res => {
      if (res) {
        this.toasterService.showToaster(ToasterType.success, ToasterMessages.delete);
        this.getAllJobs();
      }
      else {
        this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
        this.spinner.hide();
      }
    }, () => {
      this.spinner.hide();
    })
  }

  navigateTOJobEdit(jobId: string) {
    jobId && this.router.navigateByUrl(`/edit-job/${jobId}`);
  }

  navigateToAddJob() {
    this.router.navigateByUrl('/add-job');
  }
}
