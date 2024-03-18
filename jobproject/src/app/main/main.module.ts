import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LandingComponent } from './landing/landing.component';
import { AlljobsComponent } from './alljobs/alljobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobDetailsComponent } from './job-details/job-details.component';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    LandingComponent,
    AlljobsComponent,
    AddJobComponent,
    ProfileComponent,
    JobDetailsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule
  ],
  exports:[
    LandingComponent
  ],
  providers:[SearchPipe]
})
export class MainModule { }
