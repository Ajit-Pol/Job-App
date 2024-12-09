import { Routes } from '@angular/router';
// import { JobListComponent } from './job-list/job-list.component';
// import { NewJobComponent } from './new-job/new-job.component';
// import { JobDetailsComponent } from './job-details/job-details.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { AppName } from '../../shared/shared.model';
// import { MyJobsComponent } from './my-jobs/my-jobs.component';

export const jobRoutes: Routes = [
    {
        path: 'main',
        // component: JobListComponent,
        loadComponent : () => import('./job-list/job-list.component').then(c => c.JobListComponent),
        title: AppName,
        canActivate: [authGuard],
    },
    {
        path: 'my-jobs',
        // component: MyJobsComponent,
        loadComponent: ()=> import('./my-jobs/my-jobs.component').then(c => c.MyJobsComponent),
        data: {
            role: ['creator']
        },
        title: AppName + ' - My Jobs',
        canActivate: [authGuard]
    },
    {
        path: 'add-job',
        // component: NewJobComponent,
        loadComponent: () => import('./new-job/new-job.component').then(c => c.NewJobComponent),
        data: {
            role: ['creator']
        },
        title: AppName + ' - Create Job',
        canActivate: [authGuard]
    },
    {
        path: 'edit-job/:id',
        // component: NewJobComponent,
        loadComponent: ()=> import('./new-job/new-job.component').then(c => c.NewJobComponent),
        data: {
            role: ['creator']
        },
        title: AppName + ' - Edit Job',
        canActivate: [authGuard]
    },
    {
        path: 'detail-job/:id',
        // component: JobDetailsComponent,
        loadComponent: () => import('./job-details/job-details.component').then(c => c.JobDetailsComponent),
        title: AppName + ' - Job Details',
        canActivate: [authGuard]
    }
];
