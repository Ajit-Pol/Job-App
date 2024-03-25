import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobDetails, NewJob } from '../main.model';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterMessages, ToasterType } from 'src/app/shared/shared.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  addJobForm: FormGroup;
  formTitle: string = 'Add Job';
  editJobUId: string = null;

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService, private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.editJobUId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formTitle = this.editJobUId ? 'Edit Job' : 'Add Job';
    this.createForm();
    this.getSingleJob();
  }

  createForm() {
    this.addJobForm = new FormGroup({
      position: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      type: new FormControl('Full-time', [Validators.required]),
      status: new FormControl('Pending', [Validators.required]),
    })
  }

  getSingleJob() {
    if (this.editJobUId) {
      this.spinner.show();
      this.mainService.getJob(this.editJobUId).subscribe((res: { job: JobDetails }) => {
        if (res) {
          let jobData: JobDetails = res.job;
          this.addJobForm.patchValue({
            position: jobData.position,
            company: jobData.company,
            description: jobData.description,
            location: jobData.location,
            type: jobData.type,
            status: jobData.status
          })
          this.spinner.hide();
        }
      })
    }
  }

  addNewJob() {
    let saveJob = new NewJob();
    saveJob.company = this.addJobForm?.value?.company?.trim();
    saveJob.position = this.addJobForm?.value?.position?.trim();
    saveJob.description = this.addJobForm?.value?.description?.trim();
    saveJob.location = this.addJobForm?.value?.location?.trim();
    saveJob.type = this.addJobForm?.value?.type?.trim();
    saveJob.status = this.addJobForm?.value?.status?.trim();

    this.spinner.show();
    if (this.editJobUId) {
      this.mainService.editJob(this.editJobUId, saveJob).subscribe((res: any) => {
        if (res) {
          this.addJobForm.reset();
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
          this.router.navigateByUrl('main/all-jobs');
        } else {
          this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
        }
        this.spinner.hide();
      },()=>{
        this.spinner.hide();
      })
    } else {
      this.mainService.saveNewJob(saveJob).subscribe((res: any) => {
        if (res) {
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
          this.addJobForm.reset();
        } else {
          this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
        }
        this.spinner.hide();
      },()=>{
        this.spinner.hide();
      })
    }
  }

  backClick(){
    this.router.navigateByUrl('main/all-jobs');
  }
}
