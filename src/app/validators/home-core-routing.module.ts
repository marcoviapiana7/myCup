import { CreaClassificaComponent } from './../components/classifiche/crea-classifica/crea-classifica.component';
import { ModifyMatchComponent } from './../components/partite/modify-match/modify-match.component';
import { ModifyPlayerComponent } from './../components/players/modify-player/modify-player.component';
import { RouterModule, Routes } from "@angular/router"
import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from '../components/authComponents/forgot-password/forgot-password.component';
import { LoginComponent } from '../components/authComponents/login/login.component';
import { RegisterComponent } from '../components/authComponents/register/register.component';
import { VerifyEmailComponent } from '../components/authComponents/verify-email/verify-email.component';
import { AuthGuard } from "../shared/guard/auth.guard";
import { HomeGuard } from "../shared/guard/home.guard";
import { CreatePlayerComponent } from "../components/players/create-player/create-player.component";
import { DashboardComponent } from "../components/user/dashboard/dashboard.component";
import { CreateMatchComponent } from '../components/partite/create-match/create-match.component';
import { ShowMatchesComponent } from '../components/partite/show-matches/show-matches.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
        canActivate: [HomeGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create-player',
        component: CreatePlayerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'modify-player',
        component: ModifyPlayerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create-match',
        component: CreateMatchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'show-matches',
        component: ShowMatchesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'modify-match',
        component: ModifyMatchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'classifiche',
        component: CreaClassificaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeCoreRoutingModule { }