import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TongQuanComponent } from './tong-quan/tong-quan.component';
import { KhoaHocComponent } from './khoa-hoc/khoa-hoc.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import { TabViewModule } from 'primeng/tabview';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InformationComponent } from './chi-tiet-khoa-hoc/information/information.component';
import { ChuongTrinhHocComponent } from './chi-tiet-khoa-hoc/chuong-trinh-hoc/chuong-trinh-hoc.component';
import { ScoresComponent } from './chi-tiet-khoa-hoc/scores/scores.component';
import { FeedbackComponent } from './chi-tiet-khoa-hoc/feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeTableModule } from 'primeng/treetable';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { EditChuongTrinhHocComponent } from './chi-tiet-khoa-hoc/chuong-trinh-hoc/edit-chuong-trinh-hoc/edit-chuong-trinh-hoc.component';
import { DialogModule } from 'primeng/dialog';
import { ChiTietBaiKiemTraComponent } from './chi-tiet-khoa-hoc/chuong-trinh-hoc/chi-tiet-bai-kiem-tra/chi-tiet-bai-kiem-tra.component';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { ConfirmationService } from 'primeng/api';
import { register } from 'swiper/element';
import { ChartModule } from 'primeng/chart';
import { DashboardScoreComponent } from './tong-quan/dashboard-score/dashboard-score.component';
import { DashboardCourseComponent } from './tong-quan/dashboard-course/dashboard-course.component';
import { DashboardCourseDetailComponent } from './tong-quan/dashboard-course-detail/dashboard-course-detail.component';
import { DashboardOverviewComponent } from './tong-quan/dashboard-overview/dashboard-overview.component';
import { DashboardTeacherComponent } from './tong-quan/dashboard-teacher/dashboard-teacher.component';
import { PaymentComponent } from './payment/payment.component';
import { GuideSupportComponent } from './guide-support/guide-support.component';
import { TaiKhoanComponent } from './tai-khoan/tai-khoan.component';
import { ChiTietTaiKhoanComponent } from './tai-khoan/chi-tiet-tai-khoan/chi-tiet-tai-khoan.component';
import { CalendarModule } from 'primeng/calendar';
import { GiaoVienComponent } from './giao-vien/giao-vien.component';
import { ChiTietGiaoVienComponent } from './giao-vien/chi-tiet-giao-vien/chi-tiet-giao-vien.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { ChiTietLopHocComponent } from './chi-tiet-lop-hoc/chi-tiet-lop-hoc.component';
import { InfomationClassroomComponent } from './chi-tiet-lop-hoc/infomation-classroom/infomation-classroom.component';
import { InformationSubjectComponent } from './chi-tiet-lop-hoc/information-subject/information-subject.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';
import { ChiTietMonHocComponent } from './mon-hoc/chi-tiet-mon-hoc/chi-tiet-mon-hoc.component';
import { BaiHocComponent } from './bai-hoc/bai-hoc.component';
register(); // Register Swiper
@NgModule({
  declarations: [
    TongQuanComponent,
    KhoaHocComponent,
    ChiTietKhoaHocComponent,
    InformationComponent,
    ChuongTrinhHocComponent,
    ScoresComponent,
    FeedbackComponent,
    EditChuongTrinhHocComponent,
    ChiTietBaiKiemTraComponent,
    DashboardScoreComponent,
    DashboardCourseComponent,
    DashboardCourseDetailComponent,
    DashboardOverviewComponent,
    DashboardTeacherComponent,
    PaymentComponent,
    GuideSupportComponent,
    TaiKhoanComponent,
    ChiTietTaiKhoanComponent,
    GiaoVienComponent,
    ChiTietGiaoVienComponent,
    LopHocComponent,
    ChiTietLopHocComponent,
    InfomationClassroomComponent,
    InformationSubjectComponent,
    MonHocComponent,
    ChiTietMonHocComponent,
    BaiHocComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    TableModule,
    CheckboxModule,
    BreadcrumbModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    TabViewModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    AutoCompleteModule,
    EditorModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    TreeTableModule,
    MenuModule,
    SidebarModule,
    DialogModule,
    PaginatorModule,
    OverlayPanelModule,
    ChipsModule,
    CardModule,
    TabViewModule,
    TimelineModule,
    ChartModule,
    CalendarModule,
    MultiSelectModule
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AdminPageModule { }
