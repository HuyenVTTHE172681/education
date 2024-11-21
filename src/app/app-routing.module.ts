import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { LoginComponent } from './authen/login/login.component';
import { RegisterComponent } from './authen/register/register.component';

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
      import('./admin-page/admin-page.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'edu',
    component: ContentLayoutComponent,
    loadChildren: () => import('./edu/edu.module').then((m) => m.EduModule),
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
export class AppRoutingModule {}
