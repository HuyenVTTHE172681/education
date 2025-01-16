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
import { ChiTietBaiHocComponent } from './chi-tiet-bai-hoc/chi-tiet-bai-hoc.component';
import { InformationTestComponent } from './chi-tiet-bai-hoc/information-test/information-test.component';
import { InformationCommentComponent } from './chi-tiet-bai-hoc/information-comment/information-comment.component';
import { InformationQuestionComponent } from './chi-tiet-bai-hoc/information-question/information-question.component';
import { InformationFeedbackComponent } from './chi-tiet-bai-hoc/information-feedback/information-feedback.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CauHoiComponent } from './cau-hoi/cau-hoi.component';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ChiTietCauHoiComponent } from './cau-hoi/chi-tiet-cau-hoi/chi-tiet-cau-hoi.component';
import { NhomCauHoiComponent } from './nhom-cau-hoi/nhom-cau-hoi.component';
import { NamHocComponent } from './nam-hoc/nam-hoc.component';
import { DiemThiComponent } from './diem-thi/diem-thi.component';
import { TinTuyenDungComponent } from './tin-tuyen-dung/tin-tuyen-dung.component';
import { UngVienComponent } from './ung-vien/ung-vien.component';
import { ChiTietUngVienComponent } from './ung-vien/chi-tiet-ung-vien/chi-tiet-ung-vien.component';
import { ChiTietTinTuyenDungComponent } from './tin-tuyen-dung/chi-tiet-tin-tuyen-dung/chi-tiet-tin-tuyen-dung.component';
import { ChipModule } from 'primeng/chip';
import { DanhMucTinTucComponent } from './danh-muc-tin-tuc/danh-muc-tin-tuc.component';
import { TinTucComponent } from './tin-tuc/tin-tuc.component';
import { ChiTietTinTucComponent } from './chi-tiet-tin-tuc/chi-tiet-tin-tuc.component';
import { InformationNewsComponent } from './chi-tiet-tin-tuc/information-news/information-news.component';
import { RatingModule } from 'primeng/rating';
import { CommentComponent } from './chi-tiet-tin-tuc/comment/comment.component';
import { SlideComponent } from './slide/slide.component';
import { StepComponent } from './step/step.component';
import { FooterComponent } from './footer/footer.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { ThongBaoComponent } from './thong-bao/thong-bao.component';
import { YeuCauTuVanComponent } from './yeu-cau-tu-van/yeu-cau-tu-van.component';
import { TroGiupComponent } from './tro-giup/tro-giup.component';
import { MenuComponent } from './menu/menu.component';
import { SubMenuComponent } from './menu/sub-menu/sub-menu.component';
import { HanhDongComponent } from './menu/hanh-dong/hanh-dong.component';
import { NhomQuyenComponent } from './menu/nhom-quyen/nhom-quyen.component';
import { ThuVienComponent } from './thu-vien/thu-vien.component';
import { TreeModule } from 'primeng/tree';

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
    ChiTietBaiHocComponent,
    InformationTestComponent,
    InformationCommentComponent,
    InformationQuestionComponent,
    InformationFeedbackComponent,
    CauHoiComponent,
    ChiTietCauHoiComponent,
    NhomCauHoiComponent,
    NamHocComponent,
    DiemThiComponent,
    TinTuyenDungComponent,
    UngVienComponent,
    ChiTietUngVienComponent,
    ChiTietTinTuyenDungComponent,
    DanhMucTinTucComponent,
    TinTucComponent,
    ChiTietTinTucComponent,
    InformationNewsComponent,
    CommentComponent,
    SlideComponent,
    StepComponent,
    FooterComponent,
    FeedbackManagementComponent,
    ThongBaoComponent,
    YeuCauTuVanComponent,
    TroGiupComponent,
    MenuComponent,
    SubMenuComponent,
    HanhDongComponent,
    NhomQuyenComponent,
    ThuVienComponent,
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
    MultiSelectModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule,
    ChipModule,
    RatingModule,
    TreeModule
  ],
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AdminPageModule { }
