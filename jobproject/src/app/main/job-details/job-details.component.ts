import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { JobDetails } from '../main.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterMessages, ToasterType } from 'src/app/shared/shared.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobUId: string = null;
  jobDetails: JobDetails = null;
  userRole: string = null;
  subscription:Subscription;

  constructor(private router: Router, private mainService: MainService,
    private activatedRoute: ActivatedRoute, private authService: AuthService,
    private toasterService: ToasterService, private spinner: NgxSpinnerService) {
      this.subscription = this.authService.getUserRole().subscribe(res => {
        if (res)
          this.userRole = res
      })
  }

  ngOnInit() {
    this.jobUId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getJobDetails();
  }

  ngOnDestory(){
    this.subscription.unsubscribe();
  }

  getJobDetails() {
    if (this.jobUId) {
      this.spinner.show();
      this.mainService.getJob(this.jobUId).subscribe((res: { job: JobDetails }) => {
        if (res) {
          this.jobDetails = res.job;
        }
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      })
    }
  }

  backClick() {
    this.router.navigateByUrl('main/all-jobs');
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
    this.mainService.sendEmail(payload).subscribe(res => {
      if (res)
        this.toasterService.showToaster(ToasterType.success, ToasterMessages.email);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    })
  }
}
