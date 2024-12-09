import { Routes } from '@angular/router';
import { authRoutes } from './components/auth/auth.routes';
import { jobRoutes } from './components/job/job.routes';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'main', pathMatch: 'full'
    },
    ...authRoutes,
    ...jobRoutes,
    {
        path: '**', component: NotFoundComponent,
        data: {
            hideHeaderFooter: true
        }
    }
];
