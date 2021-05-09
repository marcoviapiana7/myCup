import { DashboardComponent } from '../components/user/dashboard/dashboard.component';
import { HomePageComponent } from './../home-page/home-page.component';
import { RouterModule, Routes } from "@angular/router"
import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from '../components/authComponents/forgot-password/forgot-password.component';
import { LoginComponent } from '../components/authComponents/login/login.component';
import { RegisterComponent } from '../components/authComponents/register/register.component';
import { VerifyEmailComponent } from '../components/authComponents/verify-email/verify-email.component';
import { AuthGuard } from '../shared/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'verify-email',
                component: VerifyEmailComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomePageRoutingModule { }