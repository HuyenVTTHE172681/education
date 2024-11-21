import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KhoaHocComponent } from './khoa-hoc/khoa-hoc.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        component: KhoaHocComponent,
      },
    ],
  },
];

// const routes: Routes = [
//   {
//     path: '', 
//     component: KhoaHocComponent,
//   },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
