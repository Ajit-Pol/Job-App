import { Component } from '@angular/core';
import { Regex, ValidationMessages } from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../shared/services/toaster.service';
import { UserService } from '../user.service';
import { ToasterMessages, ToasterType } from '../../../shared/shared.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  status: string = 'email';
  controlValue: any = null;
  controlValue2: string = null;
  controlButtton: string = 'Send OTP';
  errorMsg: string = null;
  isPasswordMatch: boolean = false;
  currentUserEmail: string = null;

  constructor(private spinner: NgxSpinnerService, private toasterService: ToasterService, private userService: UserService,private router:Router) {

  }

  resetPassAction() {
    if (this.status == 'email') {
      if (!this.controlValue || !Regex.email.test(this.controlValue)) {
        this.errorMsg = ValidationMessages.email;
      } else {
        this.sendOTPMail(this.controlValue);
      }
    } else if (this.status == 'otp') {
      if (!Regex.opt.test(this.controlValue)) {
        this.errorMsg = 'Please enter a valid OTP'
      } else {
        this.validateOTP(this.controlValue);
      }
    } else if (this.status == 'password') {
      if (!this.controlValue || !this.controlValue2) {
        this.errorMsg = 'Please enter a valid password';
      } else if (!Regex.password.test(this.controlValue)) {
        this.errorMsg = ValidationMessages.password
      } else if (!this.isPasswordMatch) {
        this.errorMsg = 'Password not matched, Please validate.'
      } else if (this.controlValue && this.isPasswordMatch) {
        this.saveNewPassword(this.controlValue);
      }
    }
  }

  sendOTPMail(controlValue) {
    this.spinner.show();
    let payload = { type: 'otp', email: controlValue }
    this.userService.sendOTP(payload).subscribe({
      next: res => {
        if (res) {
          this.currentUserEmail = controlValue;
          this.status = 'otp';
          this.controlButtton = 'Validate OTP';
          this.errorMsg = null;
          this.controlValue = null;
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.email);
        }
        this.spinner.hide();
      },
      error: (error) => {
        if (error?.status == 400)
          this.errorMsg = error.error.msg;
        this.spinner.hide();
      }
    })
  }

  validateOTP(otp: number) {
    this.spinner.show();
    const payload = {
      otp: otp
    }
    this.userService.ValidateOTP(payload).subscribe({
      next: res => {
        if (res) {
          this.status = 'password';
          this.controlButtton = 'Save';
          this.errorMsg = null;
          this.controlValue = null;
        }
        this.spinner.hide();
      },
      error: (error) => {
        if (error?.status == 400)
          this.errorMsg = error.error.msg;
        this.spinner.hide();
      }
    })
  }

  saveNewPassword(controlValue) {
    this.spinner.show();
    let payload = {
      email: this.currentUserEmail,
      password: controlValue
    }
    this.userService.resetPassword(payload).subscribe({
      next: res => {
        if (res) {
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.passwordReset);
          this.router.navigateByUrl('login');
          this.spinner.hide();
        }
      },
      error: () => { this.spinner.hide(); }
    })
  }

  confirmPassword() {
    if (this.controlValue === this.controlValue2) {
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
      this.errorMsg = null; 
    }
  }

  onChangeInPassword() {
    this.controlValue2 = null;
    this.errorMsg = null;
  }

  showHidePassword(id: string) {
    const ele = document.getElementById(id) as HTMLInputElement;
    if (ele?.type == 'password')
      ele.type = 'text'
    else
      ele.type = 'password'
  }
}
