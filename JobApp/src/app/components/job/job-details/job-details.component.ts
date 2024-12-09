import { Component } from '@angular/core';
import { JobDetails } from '../job.model';
import { ToasterService } from '../../../shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ToasterMessages, ToasterType } from '../../../shared/shared.model';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobUId: string = null;
  jobDetails: JobDetails = null;
  userRole: string = null;
  // subscription: Subscription;

  constructor(
    // private router: Router, 
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    // private authService: AuthService,
    private toasterService: ToasterService, private spinner: NgxSpinnerService) {
    // this.subscription = this.authService.getUserRole().subscribe(res => {
    //   if (res)
    //     this.userRole = res
    // })
  }

  ngOnInit() {
    this.jobUId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getJobDetails();
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  getJobDetails() {
    if (this.jobUId) {
      this.spinner.show();
      this.jobService.getJob(this.jobUId).subscribe((res: { job: JobDetails }) => {
        if (res) {
          this.jobDetails = res.job;
        }
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      })
    }
  }

  apply() {
    this.spinner.show();
    let payload = {
      type: 'apply',
      details: {
        position: this.jobDetails.position,
        company: this.jobDetails.company,
        location: this.jobDetails.location
      }
    }
    this.jobService.sendEmail(payload).subscribe(res => {
      if (res)
        this.toasterService.showToaster(ToasterType.success, ToasterMessages.email);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    })
  }
}
