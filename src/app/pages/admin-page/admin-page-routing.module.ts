import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KhoaHocComponent } from './khoa-hoc/khoa-hoc.component';
import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import { TongQuanComponent } from './tong-quan/tong-quan.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: TongQuanComponent,
      },
      {
        path: 'quan-tri/khoa-hoc',
        component: KhoaHocComponent,
      },
      {
        path: 'quan-tri/chi-tiet-khoa-hoc/:id',
        component: ChiTietKhoaHocComponent,
      },
    ],
  },
];

// const routes: Routes = [
//   {
//     path: '',
//     component: TongQuanComponent,
//   },
//   {
//     path: 'quan-tri/khoa-hoc',
//     component: KhoaHocComponent,
//   },
//   {
//     path: 'quan-tri/chi-tiet-khoa-hoc/:id',
//     component: ChiTietKhoaHocComponent,
//   },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
