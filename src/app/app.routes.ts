import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FeedComponent } from './component/feed/feed.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'feed',
        component: FeedComponent,
    },
    {
        path: 'profile',
        loadComponent: () => import('./component/profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: 'signin',
        loadComponent: () => import ('./component/signin/signin.component').then(c => c.SigninComponent)
    }
];
