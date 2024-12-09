import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../user.service';
import { AuthInfo, Login } from '../user.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string = null;

  constructor(private authService: AuthService, private userService: UserService,
    private router: Router, private spinner: NgxSpinnerService
  ) { }


  login(form) {
    console.log(form)
    if (this.validateFormData(form)) {
      this.spinner.show();
      let payload = new Login();
      payload.email = form?.value?.email;
      payload.password = form?.value?.password;
      this.userService.login(payload).subscribe({
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

  validateFormData(form) {
    if (form.invalid) {
      this.errorMsg = 'Please enter a valid email address and password.'
      return false;
    }
    this.errorMsg = null;
    return true
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }

  navigateForgotPassword() {
    this.router.navigateByUrl('reset-password');
  }

  showHidePassword(id: string) {
    const ele = document.getElementById(id) as HTMLInputElement;
    if (ele?.type == 'password')
      ele.type = 'text'
    else
      ele.type = 'password'
  }

  loginAsGuest() {
    this.userService.guest().subscribe({
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
