import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FeedComponent } from './component/feed/feed.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';

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
        component: ProfileComponent
    }
];
