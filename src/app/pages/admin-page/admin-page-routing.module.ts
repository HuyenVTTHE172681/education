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
import { GuideSupportComponent } from './guide-support/guide-support.component';
import { TaiKhoanComponent } from './tai-khoan/tai-khoan.component';
import { ChiTietTaiKhoanComponent } from './tai-khoan/chi-tiet-tai-khoan/chi-tiet-tai-khoan.component';
import { GiaoVienComponent } from './giao-vien/giao-vien.component';
import { ChiTietGiaoVienComponent } from './giao-vien/chi-tiet-giao-vien/chi-tiet-giao-vien.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { ChiTietLopHocComponent } from './chi-tiet-lop-hoc/chi-tiet-lop-hoc.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';
import { ChiTietMonHocComponent } from './mon-hoc/chi-tiet-mon-hoc/chi-tiet-mon-hoc.component';
import { BaiHocComponent } from './bai-hoc/bai-hoc.component';
import { ChiTietBaiHocComponent } from './chi-tiet-bai-hoc/chi-tiet-bai-hoc.component';
import { CauHoiComponent } from './cau-hoi/cau-hoi.component';

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
        // children: [
        //   { path: '0', component: InformationComponent },
        //   { path: '1', component: ChuongTrinhHocComponent },
        //   { path: '2', component: ScoresComponent },
        //   { path: '3', component: FeedbackComponent },
        //   { path: '', redirectTo: '0', pathMatch: 'full' },
        // ],
      },
      {
        path: 'thanh-toan',
        component: PaymentComponent
      },
      {
        path: 'giup-do',
        component: GuideSupportComponent
      },
      {
        path: 'tai-khoan',
        component: TaiKhoanComponent
      },
      {
        path: 'tai-khoan/:id',
        component: ChiTietTaiKhoanComponent
      },
      {
        path: 'giao-vien',
        component: GiaoVienComponent
      },
      {
        path: 'giao-vien/them-moi',
        component: ChiTietGiaoVienComponent
      },
      {
        path: 'giao-vien/:id',
        component: ChiTietGiaoVienComponent
      },
      {
        path: 'lop-hoc',
        component: LopHocComponent
      },
      {
        path: 'lop-hoc/them-moi',
        component: ChiTietLopHocComponent
      },
      {
        path: 'lop-hoc/:id',
        component: ChiTietLopHocComponent
      },
      {
        path: 'mon-hoc',
        component: MonHocComponent
      },
      {
        path: 'mon-hoc/them-moi',
        component: ChiTietMonHocComponent
      },
      {
        path: 'mon-hoc/:id',
        component: ChiTietMonHocComponent
      },
      {
        path: 'bai-kiem-tra',
        component: BaiHocComponent
      },
      {
        path: 'bai-kiem-tra/them-moi',
        component: ChiTietBaiHocComponent
      },
      {
        path: 'bai-kiem-tra/:id',
        component: ChiTietBaiHocComponent,
      },
      {
        path: 'cau-hoi',
        component: CauHoiComponent
      }

    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
