import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KhoaHocComponent } from './khoa-hoc/khoa-hoc.component';
import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import { TongQuanComponent } from './tong-quan/tong-quan.component';
import { InformationComponent } from './chi-tiet-khoa-hoc/information/information.component';
import { ChuongTrinhHocComponent } from './chi-tiet-khoa-hoc/chuong-trinh-hoc/chuong-trinh-hoc.component';
import { ScoresComponent } from './chi-tiet-khoa-hoc/scores/scores.component';
import { FeedbackComponent } from './chi-tiet-khoa-hoc/feedback/feedback.component';
import { PaymentComponent } from './payment/payment.component';

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
        path: 'tong-quan',
        component: TongQuanComponent
      },
      {
        path: 'khoa-hoc',
        component: KhoaHocComponent,
      },
      {
        path: 'chi-tiet-khoa-hoc/:id',
        component: ChiTietKhoaHocComponent,
        children: [
          { path: '0', component: InformationComponent },
          { path: '1', component: ChuongTrinhHocComponent },
          { path: '2', component: ScoresComponent },
          { path: '3', component: FeedbackComponent },
          { path: '', redirectTo: '0', pathMatch: 'full' },
        ],
      },
      {
        path: 'thanh-toan',
        component: PaymentComponent
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
