import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Register, ValidationMessages } from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordErrorMsg: string = null;
  validationMessage = ValidationMessages;
  errorMsg:string = null;
  
  constructor(private router:Router, private userSerivce:UserService, private spinner: NgxSpinnerService){}

  ngOnInit() {
    this.createRegisterForm();
    this.onChangeForm();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  register() {
    if (this.registerForm.valid && !this.passwordErrorMsg) {
      this.spinner.show();
      let payload = new Register();
      payload.name = this.registerForm?.value?.name;
      payload.email = this.registerForm?.value?.email?.toLowerCase();
      payload.location = this.registerForm?.value?.location;
      payload.password = this.registerForm?.value?.password;

      this.userSerivce.register(payload).subscribe({
        next: (res: any) => {
          if (res?.success)
            this.router.navigateByUrl('login');
          this.spinner.hide();
        },
        error: (error) => {
          if (error?.error?.msg?.toLowerCase().includes('duplicate')) {
            this.errorMsg = " This email address is already registered. Please log in or use a different email address to create a new account."
          }
          this.spinner.hide();
        }
      })
    }
  }

  onChangeForm() {
    this.registerForm.valueChanges.subscribe(()=>{
      this.errorMsg = null;
    })

    this.registerForm.get('password').valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword').reset();
    })

    this.registerForm.get('confirmPassword').valueChanges.pipe(debounceTime(300)).subscribe(value => {
      let password = this.registerForm.get('password').value;
      if (value && password != value)
        this.passwordErrorMsg = 'Password not matched, Please validate.';
      else
        this.passwordErrorMsg = null;
    })
  }

  getErrorMsg(formControl, minChar: number = null) {
    let errMsg: string = null;
    if (this.registerForm.get(formControl)?.errors?.required)
      errMsg = this.validationMessage.required;
    else if (this.registerForm.get(formControl)?.errors?.minlength)
      errMsg = formControl == 'password' ? this.validationMessage.password : this.validationMessage.minLength.replace('$', minChar.toString());
    else if (this.registerForm.get(formControl)?.errors?.pattern) {
      if (formControl == 'email')
        errMsg = this.validationMessage.email;
      else if (formControl == 'password')
        errMsg = this.validationMessage.password;
    }
    return errMsg
  }

  showHidePassword(id:string){
    const ele = document.getElementById(id) as HTMLInputElement;
    if(ele?.type == 'password')
      ele.type = 'text'
    else 
      ele.type = 'password'    
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }
}
