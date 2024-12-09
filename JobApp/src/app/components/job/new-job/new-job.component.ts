import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobDetails, NewJob } from '../job.model';
import { ToasterMessages, ToasterType } from '../../../shared/shared.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-job',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-job.component.html',
  styleUrl: './new-job.component.css'
})
export class NewJobComponent {
  addJobForm: FormGroup;
  formTitle: string = 'Add New Job';
  editJobUId: string = null;

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.editJobUId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formTitle = this.editJobUId ? 'Edit Job Details' : 'Add New Job';
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
      vacancy: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
      exprience: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
      requirement: new FormControl('', [Validators.required]),
    })
  }

  getSingleJob() {
    if (this.editJobUId) {
      this.spinner.show();
      this.jobService.getJob(this.editJobUId).subscribe((res: { job: JobDetails }) => {
        if (res) {
          let jobData: JobDetails = res.job;
          this.addJobForm.patchValue({
            position: jobData.position,
            company: jobData.company,
            description: jobData.description,
            location: jobData.location,
            type: jobData.type,
            status: jobData.status,
            vacancy: jobData.vacancy,
            exprience: jobData.exprience,
            requirement: jobData.requirement
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
    saveJob.exprience = this.addJobForm?.value?.exprience;
    saveJob.vacancy = this.addJobForm?.value?.vacancy;
    saveJob.requirement = this.addJobForm?.value?.requirement?.trim();

    this.spinner.show();
    if (this.editJobUId) {
      this.jobService.editJob(this.editJobUId, saveJob).subscribe((res: any) => {
        if (res) {
          this.addJobForm.reset();
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
          this.router.navigateByUrl('/my-jobs');
        } else {
          this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
        }
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      })
    } else {
      this.jobService.saveNewJob(saveJob).subscribe((res: any) => {
        if (res) {
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
          this.addJobForm.reset();
          this.router.navigateByUrl('/my-jobs');
        } else {
          this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
        }
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      })
    }
  }

  onClickCancel(){
    this.router.navigateByUrl('/my-jobs');
  }
}
