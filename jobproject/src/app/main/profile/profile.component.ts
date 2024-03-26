import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from 'src/app/login/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../main.service';
import { ToasterMessages, ToasterType } from 'src/app/shared/shared.model';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userRole: string = null;
  profileForm: FormGroup;
  validationMessage = ValidationMessages;
  subscription:Subscription;


  constructor(private authService: AuthService, private toasterService:ToasterService,
    private formBuilder: FormBuilder, private mainService: MainService, private spinner: NgxSpinnerService) {
      this.subscription = this.authService.getUserRole().subscribe(res => {
        if (res)
          this.userRole = res
          this.createForm()
      })
  }

  ngOnInit() {
    // this.createForm()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [{value:'', disable:true }, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      location: ['', Validators.required],
    })

    if (this.userRole == 'reader') {
      this.profileForm = this.formBuilder.group({
        ...this.profileForm.controls,
        exprience: [''],
        projects: [''],
        skills: [''],
      })
    }

    this.getProfile();
  }

  getProfile() {
    this.spinner.show();
    this.mainService.getProfile().subscribe((res: any) => {
      if (res && res.success) {
        let profileData = res.user;
        this.profileForm.patchValue({
          name: profileData?.name,
          email: profileData?.email,
          location: profileData?.location,
          exprience: profileData?.exprience,
          projects: profileData?.projects,
          skills: profileData?.skills
        })
      }
      this.spinner.hide();
    },()=>{
      this.spinner.hide();
    })
  }

  submitProfile() {
    this.spinner.show();
    this.mainService.saveProfile(this.profileForm.value).subscribe(res=>{
      if (res) {
        this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
        const user = {
          name: this.profileForm.value.name,
          role: this.userRole
        }

        this.authService.setUser(user);
      } else {
        this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
      }
      this.spinner.hide();
    },()=>{
      this.spinner.hide();
    })

  }


  getErrorMsg(formControl, minChar: number = null) {
    let errMsg: string = null;
    if (this.profileForm.get(formControl)?.errors?.required)
      errMsg = this.validationMessage.required;
    else if (this.profileForm.get(formControl)?.errors?.minlength)
      errMsg = this.validationMessage.minLength.replace('$', minChar.toString());
    else if (this.profileForm.get(formControl)?.errors?.pattern) {
      errMsg = this.validationMessage.email;
    }
    return errMsg
  }

}
