import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TongQuanComponent } from './tong-quan/tong-quan.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { KhoaHocComponent } from './khoa-hoc/khoa-hoc.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [TongQuanComponent, AdminLayoutComponent, KhoaHocComponent],
  imports: [CommonModule, AdminPageRoutingModule, TableModule, CheckboxModule, BreadcrumbModule],
})
export class AdminPageModule {}
