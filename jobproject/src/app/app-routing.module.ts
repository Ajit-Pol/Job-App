import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '', redirectTo:'main', pathMatch:'full'
  },
  {
    path:'**', component:NotFoundComponent,
    data:{
      hideHeaderFooter: true
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginModule,
    MainModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
