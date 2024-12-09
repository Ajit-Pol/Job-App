"use strict";(self.webpackChunkJobApp=self.webpackChunkJobApp||[]).push([[752],{2752:(w,p,i)=>{i.r(p),i.d(p,{ForgotPasswordComponent:()=>P});var l=i(4968),d=i(5694),a=i(4341),e=i(4438),u=i(6554),h=i(2130),_=i(1422);function m(r,c){if(1&r){const s=e.RV6();e.j41(0,"div",5)(1,"label",10),e.EFF(2,"Enter Registered Email"),e.k0s(),e.j41(3,"input",11),e.mxI("ngModelChange",function(t){e.eBV(s);const n=e.XpG();return e.DH7(n.controlValue,t)||(n.controlValue=t),e.Njj(t)}),e.k0s()()}if(2&r){const s=e.XpG();e.R7$(3),e.R50("ngModel",s.controlValue)}}function g(r,c){if(1&r){const s=e.RV6();e.j41(0,"div",5)(1,"label",10),e.EFF(2,"Enter One-Time Password (OTP)"),e.k0s(),e.j41(3,"input",12),e.mxI("ngModelChange",function(t){e.eBV(s);const n=e.XpG();return e.DH7(n.controlValue,t)||(n.controlValue=t),e.Njj(t)}),e.k0s()()}if(2&r){const s=e.XpG();e.R7$(3),e.R50("ngModel",s.controlValue)}}function f(r,c){if(1&r){const s=e.RV6();e.j41(0,"div",13)(1,"label",14),e.EFF(2,"Password"),e.k0s(),e.j41(3,"input",15),e.mxI("ngModelChange",function(t){e.eBV(s);const n=e.XpG();return e.DH7(n.controlValue,t)||(n.controlValue=t),e.Njj(t)}),e.k0s(),e.j41(4,"img",16),e.bIt("click",function(){e.eBV(s);const t=e.XpG();return e.Njj(t.showHidePassword("password"))}),e.k0s()(),e.j41(5,"div",5)(6,"label",14),e.EFF(7,"Confirm Password"),e.k0s(),e.j41(8,"input",17),e.mxI("ngModelChange",function(t){e.eBV(s);const n=e.XpG();return e.DH7(n.controlValue2,t)||(n.controlValue2=t),e.Njj(t)}),e.k0s()()}if(2&r){const s=e.XpG();e.R7$(3),e.R50("ngModel",s.controlValue),e.R7$(5),e.R50("ngModel",s.controlValue2)}}function M(r,c){if(1&r&&(e.j41(0,"p",7),e.EFF(1),e.k0s()),2&r){const s=e.XpG();e.R7$(),e.JRh(s.errorMsg)}}let P=(()=>{class r{constructor(s,o,t){this.spinner=s,this.toasterService=o,this.userService=t,this.status="email",this.controlValue=null,this.controlValue2=null,this.controlButtton="Send OTP",this.errorMsg=null,this.isPasswordMatch=!1,this.currentUserEmail=null}resetPassAction(){"email"==this.status?this.controlValue&&l.Ge.email.test(this.controlValue)?this.sendOTPMail(this.controlValue):this.errorMsg=l.QC.email:"otp"==this.status?l.Ge.opt.test(this.controlValue)?this.validateOTP(this.controlValue):this.errorMsg="Please enter a valid OTP":"password"==this.status&&(this.controlValue&&this.controlValue2?l.Ge.password.test(this.controlValue)?this.isPasswordMatch?this.controlValue&&this.isPasswordMatch&&this.saveNewPassword(this.controlValue):this.errorMsg="Password not matched, Please validate.":this.errorMsg=l.QC.password:this.errorMsg="Please enter a valid password")}sendOTPMail(s){this.spinner.show(),this.userService.sendOTP({type:"otp",email:s}).subscribe({next:t=>{t&&(this.currentUserEmail=s,this.status="otp",this.controlButtton="Validate OTP",this.errorMsg=null,this.controlValue=null,this.toasterService.showToaster(d.NH.success,d.dF.email)),this.spinner.hide()},error:t=>{400==t?.status&&(this.errorMsg=t.error.msg),this.spinner.hide()}})}validateOTP(s){this.spinner.show(),this.userService.ValidateOTP({otp:s}).subscribe({next:t=>{t&&(this.status="password",this.controlButtton="Save",this.errorMsg=null,this.controlValue=null),this.spinner.hide()},error:t=>{400==t?.status&&(this.errorMsg=t.error.msg),this.spinner.hide()}})}saveNewPassword(s){this.spinner.show(),this.userService.resetPassword({email:this.currentUserEmail,password:s}).subscribe({next:t=>{t&&(this.toasterService.showToaster(d.NH.success,d.dF.passwordReset),this.spinner.hide())},error:()=>{this.spinner.hide()}})}showHidePassword(s){const o=document.getElementById(s);o.type="password"==o?.type?"text":"password"}static{this.\u0275fac=function(o){return new(o||r)(e.rXU(u.ex),e.rXU(h.W),e.rXU(_.D))}}static{this.\u0275cmp=e.VBU({type:r,selectors:[["app-forgot-password"]],standalone:!0,features:[e.aNF],decls:17,vars:5,consts:[[1,"container","d-flex","justify-content-center","align-items-center","my-5"],[1,"card","card_c","shadow-sm"],[1,"card-body","p-4"],[1,"text-center","mb-2","heading_fw"],[1,"text-center","text-muted"],[1,"mb-3"],[1,"d-grid","gap-2"],[1,"text-danger","m-0"],["type","button",1,"btn","btn-primary",3,"click"],[1,"text-danger","text-center"],["for","email",1,"form-label"],["type","email","name","email","id","email","placeholder","Enter your email","required","","email","",1,"form-control",3,"ngModelChange","ngModel"],["type","email","name","email","id","email","placeholder","Enter your email","required","",1,"form-control",3,"ngModelChange","ngModel"],[1,"mb-3","relative_pos"],["for","password",1,"form-label"],["type","password","name","password","id","password","placeholder","Enter your password","required","",1,"form-control",3,"ngModelChange","ngModel"],["src","images/eye.svg","alt","eye icon",1,"form-eye-img","cursor-pointer",3,"click"],["type","password","name","password","id","confirm-password","placeholder","Confirm your password","required","",1,"form-control",3,"ngModelChange","ngModel"]],template:function(o,t){1&o&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),e.EFF(4,"JobQuest "),e.k0s(),e.j41(5,"p",4),e.EFF(6,"Reset your account password"),e.k0s(),e.j41(7,"form"),e.DNE(8,m,4,1,"div",5)(9,g,4,1,"div",5)(10,f,9,2),e.j41(11,"div",6),e.DNE(12,M,2,1,"p",7),e.j41(13,"button",8),e.bIt("click",function(){return t.resetPassAction()}),e.EFF(14),e.k0s(),e.j41(15,"p",9),e.EFF(16,"Please do not refresh this page."),e.k0s()()()()()()),2&o&&(e.R7$(8),e.vxM("email"==t.status?8:-1),e.R7$(),e.vxM("otp"==t.status?9:-1),e.R7$(),e.vxM("password"==t.status?10:-1),e.R7$(2),e.vxM(t.errorMsg?12:-1),e.R7$(2),e.JRh(t.controlButtton))},dependencies:[a.YN,a.qT,a.me,a.BC,a.cb,a.YS,a.Dg,a.vS,a.cV],styles:[".card_c[_ngcontent-%COMP%]{width:400px;border-radius:10px}.heading_fw[_ngcontent-%COMP%]{font-weight:600}.form-eye-img[_ngcontent-%COMP%]{position:absolute;right:5px;top:43px}.relative_pos[_ngcontent-%COMP%]{position:relative}"]})}}return r})()}}]);