import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToasterMessages, ToasterType } from '../../../shared/shared.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessages } from '../user.model';
import { ToasterService } from '../../../shared/services/toaster.service';
import { UserService } from '../user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ImageDirective } from '../../../shared/directives/image.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ImageDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileForm: FormGroup;
  validationMessage = ValidationMessages;
  profileSrc: string = null;
  profileId: string = null;
  @ViewChild('uploadfile') uploadfile: ElementRef;

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private formBuilder: FormBuilder, private userService: UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [{ value: '', disable: true }, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      location: ['', Validators.required],
      exprience: [''],
      projects: [''],
      skills: ['']
    })

    this.getProfile();
  }

  getProfile() {
    this.spinner.show();
    this.userService.getProfile().subscribe((res: any) => {
      if (res && res.success) {
        let profileData = res.user;
        this.profileId = profileData?.profileId || null
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
    }, () => {
      this.spinner.hide();
    })
  }

  submitProfile() {
    this.spinner.show();
    this.userService.saveProfile(this.profileForm.value).subscribe(res => {
      if (res) {
        this.toasterService.showToaster(ToasterType.success, ToasterMessages.save);
        this.getProfile();
        const user = {
          name: this.profileForm.value.name,
          profileId: this.profileId,
          profileSrc: this.profileSrc
        }

        this.authService.setUser(user);
      } else {
        this.toasterService.showToaster(ToasterType.warning, ToasterMessages.errorMsg);
      }
      this.spinner.hide();
    }, () => {
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

  profilePhotoUpload(event) {
    let file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.spinner.show();
      this.userService.fileUpload(formData).subscribe((res: any) => {
        if (res && res?.src) {
          this.profileSrc = res.src;
          this.profileId = res?.profileId;
          const user = {
            name: this.profileForm.value.name,
            profileId: res?.profileId,
            profileSrc: this.profileSrc
          }
          this.authService.setUser(user);
        }
        this.uploadfile.nativeElement.value = ''
        this.spinner.hide();
      })
    }
  }

  removeProfileImg() {
    this.profileId && this.userService.deleteFile(this.profileId).subscribe((res: any) => {
      if (res) {
        this.profileId = null;
        this.profileSrc = null;
        const user = {
          name: this.profileForm.value.name,
          profileId: res?.profileId,
          profileSrc: this.profileSrc
        }
        this.authService.setUser(user);
      }
    })
  }
}
