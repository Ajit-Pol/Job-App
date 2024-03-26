import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login, AuthInfo, Regex, ValidationMessages } from '../login.model';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToasterMessages, ToasterType } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string = null;
  showModal: boolean = false;
  controlValue: any = null;
  controlValue2: string = null;
  controlButtton: string = 'Send OTP';
  status: string = 'email';
  errorMsg2: string = null;
  isPasswordMatch: boolean = false;
  currentUserEmail: string = null;

  constructor(private loginService: LoginService, private authService: AuthService,
    private router: Router, private spinner: NgxSpinnerService, private toasterService: ToasterService,) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    if (this.validateFormData()) {
      this.spinner.show();
      let payload = new Login();
      payload.email = this.loginForm.get('email').value;
      payload.password = this.loginForm.get('password').value;
      this.loginService.login(payload).subscribe({
        next: (res: AuthInfo) => {
          if (res?.success) {
            this.authService.setUser(res?.user);
            this.authService.loginStatus(true);
          }
          this.spinner.hide();
        },
        error: (error) => {
          if (error?.status == 401)
            this.errorMsg = error?.error?.msg
          this.spinner.hide();
        }
      })
    }
  }

  validateFormData() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please enter a valid email address and password.'
      return false;
    }
    this.errorMsg = null;
    return true
  }

  showHidePassword(id: string) {
    const ele = document.getElementById(id) as HTMLInputElement;
    if (ele?.type == 'password')
      ele.type = 'text'
    else
      ele.type = 'password'
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }

  forgotPassward() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false;
    this.controlValue = null;
    this.controlValue2 = null;
    this.controlButtton = 'Send OTP';
    this.status = 'email';
    this.errorMsg2 = null;
  }

  confirmPassword() {
    if (this.controlValue === this.controlValue2) {
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
      this.errorMsg2 = null;
    }
  }

  onChangeInPassword() {
    this.controlValue2 = null;
    this.errorMsg2 = null;
  }

  forgotPassAction() {
    if (this.status == 'email') {
      if (!this.controlValue || !Regex.email.test(this.controlValue)) {
        this.errorMsg2 = ValidationMessages.email;
      } else {
        this.sendOTPMail(this.controlValue);
      }
    } else if (this.status == 'otp') {
      if (!Regex.opt.test(this.controlValue)) {
        this.errorMsg2 = 'Please enter a valid OTP'
      } else {
        this.validateOTP(this.controlValue);
      }
    } else if (this.status == 'password') {
      if (!this.controlValue || !this.controlValue2) {
        this.errorMsg2 = 'Please enter a valid password';
      } else if (!Regex.password.test(this.controlValue)) {
        this.errorMsg2 = ValidationMessages.password
      } else if (!this.isPasswordMatch) {
        this.errorMsg2 = 'Password not matched, Please validate.'
      } else if (this.controlValue && this.isPasswordMatch) {
        this.saveNewPassword(this.controlValue);
      }
    }
  }

  sendOTPMail(controlValue) {
    this.spinner.show();
    let payload = { type: 'otp', email: controlValue }
    this.loginService.sendOTP(payload).subscribe({
      next: res => {
        if (res) {
          this.currentUserEmail = controlValue;
          this.status = 'otp';
          this.controlButtton = 'Validate OTP';
          this.errorMsg2 = null;
          this.controlValue = null;
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.email);
        }
        this.spinner.hide();
      },
      error: (error) => {
        if (error?.status == 400)
          this.errorMsg2 = error.error.msg;
        this.spinner.hide();
      }
    })
  }

  validateOTP(otp: number) {
    this.spinner.show();
    const payload = {
      otp: otp
    }
    this.loginService.ValidateOTP(payload).subscribe({
      next: res => {
        if (res) {
          this.status = 'password';
          this.controlButtton = 'Save';
          this.errorMsg2 = null;
          this.controlValue = null;
        }
        this.spinner.hide();
      },
      error: (error) => {
        if (error?.status == 400)
        this.errorMsg2 = error.error.msg;
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
    this.loginService.resetPassword(payload).subscribe({
      next: res => {
        if (res) {
          this.closeModal();
          this.toasterService.showToaster(ToasterType.success, ToasterMessages.passwordReset);
          this.spinner.hide();
        }
      },
      error: ()=> {this.spinner.hide();}
    })
  }
}
