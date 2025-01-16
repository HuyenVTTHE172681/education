import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './pages/authen/login/login.component';
import { RegisterComponent } from './pages/authen/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'edu',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'edu',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'quan-tri',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edu',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./pages/edu/edu.module').then((m) => m.EduModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
