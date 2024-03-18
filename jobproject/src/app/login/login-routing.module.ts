import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginstatusGuard } from './loginstatus.guard';

const routes: Routes = [
  {
    path:'login', 
    component: LoginComponent,
    data:{
      hideHeaderFooter:true
    },
    canActivate:[LoginstatusGuard]
  },
  {
    path:'register', 
    component: RegisterComponent,
    data:{
      hideHeaderFooter:true
    },
    canActivate:[LoginstatusGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
