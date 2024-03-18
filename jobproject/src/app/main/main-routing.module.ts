import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AlljobsComponent } from './alljobs/alljobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { JobDetailsComponent } from './job-details/job-details.component';

const routes: Routes = [
  {
    path: 'main', component: LandingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all-jobs',
        pathMatch: 'full'
      },
      {
        path: 'all-jobs',
        component: AlljobsComponent,
        data: {
          role: ['reader', 'creator']
        }
      },
      {
        path: 'add-job',
        component: AddJobComponent,
        data: {
          role: ['creator']
        }
      },
      {
        path: 'edit-job/:id',
        component: AddJobComponent,
        data: {
          role: ['creator']
        }
      },
      {
        path: 'detail-job/:id',
        component: JobDetailsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          role: ['reader', 'creator']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
