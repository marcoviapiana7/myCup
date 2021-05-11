import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingGuard } from './shared/guard/routing.guard';

const routes: Routes = [
  {
    path: 'home',
    // canActivate: [RoutingGuard],
    loadChildren: () => import('../app/validators/home-core-routing.module').then(c => c.HomeCoreRoutingModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
